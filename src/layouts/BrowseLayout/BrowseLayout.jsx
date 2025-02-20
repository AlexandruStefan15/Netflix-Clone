import React, { useState, useEffect, useRef } from "react";
import styles from "./BrowseLayout.module.scss";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { isSmartTV } from "../../utils/helpers";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const primaryNavigation = [
	{ name: "Pagina Principala", path: "" },
	{ name: "Filme", path: "movies" },
	{ name: "Seriale", path: "tv-series" },
	{ name: "Noi si populare", path: "popular" },
	{ name: "Lista mea", path: "#" },
];

export function BrowseLayout() {
	const [isTop, setIsTop] = useState(false);
	const headerRef = useRef(null);
	const topRef = useRef(null);

	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname, searchParams.get("q"), searchParams.get("gid")]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsTop(entry.isIntersecting);
			},
			{ root: null, threshold: 1.0 }
		);

		if (topRef.current) {
			observer.observe(topRef.current);
		}

		return () => {
			if (topRef.current) {
				observer.unobserve(topRef.current);
			}
		};
	}, []);

	return (
		<div className={styles.layout}>
			<div ref={topRef} style={{ position: "absolute", top: 0, height: 1, width: "100%" }} />
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
