import React from "react";
import styles from "./Browse.module.scss";
import videos from "../../Assets/videos/videos";
import { inline_svgs } from "../../Assets/svgs/svgs";
import { useRef, useState, useEffect } from "react";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";
import Subtitle from "../../Components/Subtitle/Subtitle";
import Link from "../../Components/Link/Link";
import Button from "../../Components/Button/Button";

export default function Browse() {
	const subtitleRef = useRef(null);
	const moviePosterRef = useRef(null);
	const [subtitleHeight, setSubtitleHeight] = useState(0);

	useEffect(() => {
		if (subtitleRef.current) {
			const height = subtitleRef.current.offsetHeight;
			setSubtitleHeight(height);
		}
		console.log("mounted");
	}, []);

	useEffect(() => {
		if (subtitleHeight > 0 && moviePosterRef.current) {
			moviePosterRef.current.style.setProperty("--subtitle-height", `${subtitleHeight}px`);
			moviePosterRef.current.classList.add(styles.shrinkAnimation);
		}
	}, [subtitleHeight]);

	return (
		<div className={styles.page}>
			<Header className={styles.header} />
			<HeroBanner video={videos.inception} className={styles.heroBanner}>
				<div className={styles.container}>
					<div className={styles.moviePoster} ref={moviePosterRef}>
						<img
							src="https://occ-0-3467-3466.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABcTzDJAsCDtGT5vpg2kkM9k5ckuFB1yvb8uJjL4PNGvTySXitzUyeo9EhZAh0mfrMDUqf6a_yEbzqHF7sC1YTcUKpA8DkD04YHdxiBsxGrkhwYW5ebMtCkm8N4SYg4y47BXOQcKEMVt3mXymdWIvcSk_xyMtf_kWPqVVenp0bL607FFFVZ41yQ.webp?r=31d"
							alt=""
						/>
					</div>
					<Subtitle
						className={styles.subtitle}
						variant="2"
						ref={subtitleRef}
						onAnimationEnd={(e) => {
							e.target.style.overflow = "hidden";
							e.target.style.whiteSpace = "nowrap";
							e.target.style.marginTop = "max(4.85vw, 80px)";
						}}
					>
						Un hoț genial, echipa lui loială și o agentă Interpol pe urmele lor. Cu următorul jaf,
						vor ajunge fie în cărțile de istorie, fie după gratii. Un hoț genial, echipa lui loială
						și o agentă Interpol pe urmele lor. Cu următorul jaf, vor ajunge fie în cărțile de
						istorie, fie după gratii.
					</Subtitle>
					<div className={styles.links_container}>
						<Button data-variant="2">
							<div className={styles.icon}>{inline_svgs.right_arrow_thick}</div>
							<span className={styles.text}>Redare</span>
						</Button>
						<Link data-variant="2">
							<div className={styles.icon}>{inline_svgs.exclamation_mark}</div>
							<span className={styles.text}>Mai multe informatii</span>
						</Link>
					</div>
				</div>
			</HeroBanner>
			<Footer style={{ background: "inherit" }} />
		</div>
	);
}
