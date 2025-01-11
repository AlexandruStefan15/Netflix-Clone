import React from "react";
import styles from "./Browse.module.scss";
import videos from "../../Assets/videos/videos";
import images from "../../Assets/images/images";
import { NavLink, useParams, useNavigate, Outlet } from "react-router-dom";
import { inline_svgs } from "../../Assets/svgs/svgs";
import { useRef, useState, useEffect } from "react";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";

export default function Browse() {
	const categories = [
		{ name: "Pagina Principala", path: "" },
		{ name: "Filme", path: "movies" },
		{ name: "Seriale", path: "tv-series" },
		{ name: "Noi si populare", path: "popular" },
		{ name: "Lista mea", path: "#" },
	];

	return (
		<div className={styles.page}>
			<Header
				className={styles.header}
				navbarProps={{
					variant: "2",
					primaryNavigation: categories,
					selectLanguage: false,
					secondaryNavigation: true,
				}}
			/>
			<HeroBanner
				image={images.inception}
				video={videos.inception}
				movieTitleImage="https://image.tmdb.org/t/p/original/8ThUfwQKqcNk6fTOVaWOts3kvku.png"
				subtitle="Pentru a salva clubul de noapte al părinților ei, o dansatoare de pe Broadway montează
						un varieteu exclusiv masculin, cu tematică de Crăciun, apoi cunoaște un tip versat."
				movieLinks={true}
				className={styles.heroBanner}
				variant="2"
			/>
			<Outlet />
			<Footer style={{ background: "inherit" }} />
		</div>
	);
}
