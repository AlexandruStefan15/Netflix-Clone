import React from "react";
import styles from "./Browse.module.scss";
import videos from "../../Assets/videos/videos";
import { inline_svgs } from "../../Assets/svgs/svgs";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";
import Subtitle from "../../Components/Subtitle/Subtitle";
import Link from "../../Components/Link/Link";
import Button from "../../Components/Button/Button";

export default function Browse() {
	return (
		<div className={styles.page}>
			<Header className={styles.header} />
			<HeroBanner video={videos.batman} className={styles.heroBanner}>
				<div className={styles.container}>
					<div className={styles.moviePoster}>
						<img src="https://image.tmdb.org/t/p/original/hRUaVWmm7ljyG2bPyMkm6jwUAa0.png" alt="" />
					</div>
					<Subtitle className={styles.subtitle} variant="2">
						Dom Toretto înfruntă cea mai periculoasă provocare din viața lui: trebuie să-și salveze
						familia de un inamic răzbunător până la moarte și fără scrupule la volan.
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
