import React, { useState, useEffect, createContext } from "react";
import styles from "./Browse.module.scss";
import { NavLink, useParams, useNavigate, Outlet, useLocation } from "react-router-dom";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";
import { getBannerData } from "../../Data/heroBannerData";
import Modal from "../../Components/Modal/Modal";

const categories = [
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
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const movieId = queryParams.get("mid");

	const openModal = (id) => {
		const queryParams = new URLSearchParams(location.search);
		queryParams.set("mid", id);
		navigate({ search: queryParams.toString() });
	};

	const closeModal = () => {
		queryParams.delete("mid");
		navigate({ search: queryParams.toString() });
	};

	useEffect(() => {
		setBannerData(getBannerData("set1", location.pathname));
		if (location.pathname === "/browse/popular") {
			setShowBanner(false);
		}
		return () => {
			setShowBanner(true);
		};
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
