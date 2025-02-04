import React, { useState, useEffect, createContext } from "react";
import styles from "./Browse.module.scss";
import { Outlet, useLocation } from "react-router-dom";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";
import { getBannerData } from "../../Data/heroBannerData";

const primaryNavigation = [
	{ name: "Pagina Principala", path: "" },
	{ name: "Filme", path: "movies" },
	{ name: "Seriale", path: "tv-series" },
	{ name: "Noi si populare", path: "popular" },
	{ name: "Lista mea", path: "#" },
];

export const BrowseContext = createContext();

export default function Browse() {
	const [bannerData, setBannerData] = useState({});
	const [showBanner, setShowBanner] = useState(true);

	const location = useLocation();

	useEffect(() => {
		setBannerData(getBannerData("set1", location.pathname));
		if (["/browse/popular", "/browse/search"].includes(location.pathname)) {
			setShowBanner(false);
		} else setShowBanner(true);
	}, [location.pathname]);

	return (
		<div className={styles.page}>
			<Header
				className={styles.header}
				navbarProps={{
					variant: "2",
					primaryNavigation: primaryNavigation,
					selectLanguage: false,
					secondaryNavigation: true,
				}}
			/>
			{showBanner && (
				<HeroBanner
					image={bannerData?.image}
					video={bannerData?.video}
					movieLogo={bannerData?.movieLogo}
					subtitle={bannerData?.subtitle}
					movieLinks={true}
					className={styles.heroBanner}
					variant="2"
				/>
			)}
			<Outlet />
			<Footer style={{ background: "inherit" }} />
		</div>
	);
}
