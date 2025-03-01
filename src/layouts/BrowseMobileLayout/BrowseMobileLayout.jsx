import React, { useState, useEffect, useRef } from "react";
import styles from "./BrowseMobileLayout.module.scss";
import { Outlet, useLocation, useSearchParams, NavLink } from "react-router-dom";
import { inline_svgs } from "../../Assets/svgs/svgs";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Subheader } from "../../Components/Header/Header";

import { useIsElementAtTop } from "../../hooks/useIsElementAtTop";
import { useIsMobile } from "../../hooks/useIsMobile";

const primaryNavigation = [
	{ name: "Descopera", path: "" },
	{ name: "Filme", path: "movies" },
	{ name: "Seriale", path: "tv-series" },
	{ name: "Populare", path: "popular" },
];

const secondaryNavigation = [
	{ name: inline_svgs.ring_bell, path: "#" },
	{ name: inline_svgs.account, path: "#" },
];

export function BrowseMobileLayout() {
	const headerRef = useRef(null);
	const topRef = useRef(null);
	const isTop = useIsElementAtTop(topRef);
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();
	const isMobile = true;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname, searchParams.get("q"), searchParams.get("gid")]);

	return (
		<div className={styles.layout}>
			<div ref={topRef} style={{ position: "relative", top: 0, height: 1, width: "100%" }} />
			<Header
				className={styles.header + (isTop ? ` ${styles.isTop}` : "")}
				ref={headerRef}
				navbarProps={{
					variant: "2",
					primaryNavigation: false,
					selectLanguage: false,
					secondaryNavigation: secondaryNavigation,
					classNameLogo: styles.logo,
				}}
			/>
			<Subheader className={styles.subHeader}>
				<ul className={styles.navigationList}>
					{primaryNavigation.map((item, index) => (
						<li className={styles.listItem} key={index}>
							<NavLink className={styles.link} to={item.path}>
								{item.name}
							</NavLink>
						</li>
					))}
				</ul>
			</Subheader>
			<Outlet context={{ topRef, isTop, isMobile, primaryNavigation }} />
			<Footer style={{ background: "inherit" }} />
		</div>
	);
}
