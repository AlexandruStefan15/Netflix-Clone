import React, { useState, useEffect, createContext } from "react";
import styles from "./Browse.module.scss";
import { NavLink, useParams, useNavigate, Outlet, useLocation } from "react-router-dom";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";
import { getBannerData } from "../../Data/bannerData";

const BrowseContext = createContext();

const categories = [
	{ name: "Pagina Principala", path: "" },
	{ name: "Filme", path: "movies" },
	{ name: "Seriale", path: "tv-series" },
	{ name: "Noi si populare", path: "popular" },
	{ name: "Lista mea", path: "#" },
];

export default function Browse() {
	const location = useLocation();
	const [bannerData, setBannerData] = useState({});

	useEffect(() => {
		setBannerData(getBannerData("set1", location.pathname));
	}, [location.pathname]);

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
				image={bannerData.image}
				video={bannerData.video}
				movieLogo={bannerData.movieLogo}
				subtitle={bannerData.subtitle}
				movieLinks={true}
				className={styles.heroBanner}
				variant="2"
			/>
			<Outlet />
			<Footer style={{ background: "inherit" }} />
		</div>
	);
}
