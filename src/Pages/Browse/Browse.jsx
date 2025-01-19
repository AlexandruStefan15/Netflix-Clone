import React, { useRef, useState, useEffect, createContext, useContext } from "react";
import styles from "./Browse.module.scss";
import videos from "../../Assets/videos/videos";
import images from "../../Assets/images/images";
import { NavLink, useParams, useNavigate, Outlet, useLocation } from "react-router-dom";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";

const BrowseContext = createContext();

export default function Browse() {
	const location = useLocation();
	const [bannerVideo, setBannerVideo] = useState(null);

	const categories = [
		{ name: "Pagina Principala", path: "" },
		{ name: "Filme", path: "movies" },
		{ name: "Seriale", path: "tv-series" },
		{ name: "Noi si populare", path: "popular" },
		{ name: "Lista mea", path: "#" },
	];

	function getVideoBanner(videos) {
		if (location.pathname === "/browse/movies") {
			return videos.batman;
		}
		if (location.pathname === "/browse/tv-series") {
			return videos.aliceInBorderland;
		}
		if (location.pathname === "/browse") return videos.inception;
	}

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
				video={getVideoBanner(videos)}
				movieTitleImage="https://image.tmdb.org/t/p/original/8ThUfwQKqcNk6fTOVaWOts3kvku.png"
				subtitle="Un hoț care fură secrete corporative prin utilizarea tehnologiei de partajare a viselor i se încredințează sarcina de a planta o idee în mintea unui C.E.O pentru a-și asigura libertatea."
				movieLinks={true}
				className={styles.heroBanner}
				variant="2"
			/>
			<Outlet />
			<Footer style={{ background: "inherit" }} />
		</div>
	);
}
