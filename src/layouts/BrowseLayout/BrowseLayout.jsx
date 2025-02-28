import React, { useState, useEffect, useRef } from "react";
import styles from "./BrowseLayout.module.scss";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { isSmartTV } from "../../utils/helpers";
import { inline_svgs } from "../../Assets/svgs/svgs";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

import { useIsElementAtTop } from "../../hooks/useIsElementAtTop";
import { useIsMobile } from "../../hooks/useIsMobile";

const primaryNavigation = [
	{ name: "Pagina Principala", path: "" },
	{ name: "Filme", path: "movies" },
	{ name: "Seriale", path: "tv-series" },
	{ name: "Noi si populare", path: "popular" },
	{ name: "Lista mea", path: "#" },
];

export function BrowseLayout() {
	const headerRef = useRef(null);
	const topRef = useRef(null);
	const isTop = useIsElementAtTop(topRef);
	const isTV = isSmartTV();
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();
	const isMobile = useIsMobile();

	const secondaryNavigation = isMobile
		? [
				{ name: inline_svgs.ring_bell, path: "#" },
				{ name: inline_svgs.account, path: "#" },
		  ]
		: [
				{ name: "Copii", path: "#" },
				{ name: inline_svgs.ring_bell, path: "#" },
				{ name: inline_svgs.account, path: "#" },
		  ];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname, searchParams.get("q"), searchParams.get("gid")]);

	return (
		<div className={styles.layout + (isTV ? ` ${styles.isTV}` : "")}>
			<div ref={topRef} style={{ position: "absolute", top: 0, height: 1, width: "100%" }} />
			<Header
				className={styles.header + (isTop ? ` ${styles.isTop}` : "")}
				ref={headerRef}
				navbarProps={{
					variant: "2",
					primaryNavigation: isMobile ? false : primaryNavigation,
					selectLanguage: false,
					secondaryNavigation: secondaryNavigation,
					classNameLogo: styles.logo,
				}}
			/>
			<Outlet context={{ topRef, isTop, isMobile }} />
			<Footer style={{ background: "inherit" }} />
		</div>
	);
}
