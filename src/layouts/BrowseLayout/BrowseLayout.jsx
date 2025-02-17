import React, { useState, useEffect, useRef, createContext } from "react";
import styles from "./BrowseLayout.module.scss";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { movieGenres } from "../../Data/movieGenres";

import Header from "../../Components/Header/Header";
import { Subheader } from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Select, { Option } from "../../Components/Select/Select";

const primaryNavigation = [
	{ name: "Pagina Principala", path: "" },
	{ name: "Filme", path: "movies" },
	{ name: "Seriale", path: "tv-series" },
	{ name: "Noi si populare", path: "popular" },
	{ name: "Lista mea", path: "#" },
];

export function BrowseLayout() {
	const [showSubeader, setShowSubheader] = useState(false);
	const [isTop, setIsTop] = useState(false);

	const headerRef = useRef(null);
	const subheaderRef = useRef(null);
	const isFirstRender = useRef(true);

	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		// Scroll to top on route change but not on the first render (mount).
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		window.scrollTo(0, 0);
	}, [location.pathname, searchParams.get("q")]);

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
		<div className={styles.layout}>
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
			<Outlet />
			<Footer style={{ background: "inherit" }} />
		</div>
	);
}
