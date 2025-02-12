import React, { useState, useEffect, useRef, createContext } from "react";
import styles from "./Browse.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { getBannerData } from "../../Data/heroBannerData";
import { movieGenres } from "../../Data/movieGenres";

import Header from "../../Components/Header/Header";
import { Subheader } from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";
import Select, { Option } from "../../Components/Select/Select";

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
	const [showSubeader, setShowSubheader] = useState(false);
	const [isTop, setIsTop] = useState(false);

	const headerRef = useRef(null);
	const subheaderRef = useRef(null);
	const isFirstRender = useRef(true);

	const location = useLocation();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		setBannerData(getBannerData("set1", location.pathname));
		if (["/browse/popular", "/browse/search"].includes(location.pathname)) {
			setShowBanner(false);
		} else setShowBanner(true);

		if (["/browse/movies", "/browse/tv-series"].includes(location.pathname)) setShowSubheader(true);
		else setShowSubheader(false);

		if (location.pathname === "/browse/popular" && headerRef.current)
			document.body.style.backgroundColor = "#141414";
	}, [location.pathname]);

	useEffect(() => {
		// Scroll to top on route change but not on the first render/mount.
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		window.scrollTo(0, 0);
	}, [location.pathname]);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY === 0) {
				setIsTop(true);
			} else {
				setIsTop(false);
			}
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className={styles.page}>
			<Header
				className={styles.header + (isTop ? ` ${styles.isTop}` : "")}
				ref={headerRef}
				navbarProps={{
					variant: "2",
					primaryNavigation: primaryNavigation,
					selectLanguage: false,
					secondaryNavigation: true,
				}}
			/>
			{showSubeader && (
				<Subheader
					className={styles.subheader + (isTop ? ` ${styles.isTop}` : "")}
					ref={subheaderRef}
				>
					<h1 className={styles.title}>Filme</h1>
					<Select
						defaultValue=""
						className={styles.select}
						className_wrapper={styles.select_wrapper}
						key={location.pathname}
					>
						<Option value="" disabled hidden>
							Genuri
						</Option>
						{movieGenres.map((genre) => (
							<Option key={genre.id} value={genre.id}>
								{genre.shortName}
							</Option>
						))}
					</Select>
				</Subheader>
			)}
			{showBanner && !searchParams.get("q") && (
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
