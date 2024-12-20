import React from "react";
import styles from "./Browse.module.scss";
import videos from "../../Assets/videos/videos";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";
import Subtitle from "../../Components/Subtitle/Subtitle";
import Title from "../../Components/Title/Title";

export default function Browse() {
	return (
		<>
			<Header />
			<HeroBanner video={videos.batman} className={styles.heroBanner}>
				<div className={styles.container}>
					<Title>Titlul filmului</Title>
					<Subtitle className={styles.subtitle}>Descriere</Subtitle>
				</div>
			</HeroBanner>
			<Footer />
		</>
	);
}
