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
			console.log("mounted");
		}
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
						<img src="https://image.tmdb.org/t/p/original/ffFR99UQiEZv0KPcmyDhZacru9c.png" alt="" />
					</div>
					<Subtitle className={styles.subtitle} variant="2" ref={subtitleRef}>
						Pentru a salva clubul de noapte al părinților ei, o dansatoare de pe Broadway montează
						un varieteu exclusiv masculin, cu tematică de Crăciun, apoi cunoaște un tip versat.
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
