import React, { useState, useEffect, useRef, createContext } from "react";
import styles from "./Browse.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
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

export const BrowseContext = createContext();

export default function Browse() {
	const [showSubeader, setShowSubheader] = useState(false);
	const [isTop, setIsTop] = useState(false);

	const headerRef = useRef(null);
	const subheaderRef = useRef(null);
	const isFirstRender = useRef(true);

	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		if (["/browse/movies", "/browse/tv-series"].includes(location.pathname)) setShowSubheader(true);
		else setShowSubheader(false);
	}, [location.pathname]);

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

	function getTitle() {
		const segments = location.pathname.split("/").filter(Boolean);
		const lastSegment = segments.length > 0 ? segments[segments.length - 1] : null;

		switch (lastSegment) {
			case "movies":
				return "Filme";
			case "tv-series":
				return "Seriale";
		}
	}

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
					<h1 className={styles.title}>{getTitle()}</h1>
					<Select
						value={searchParams.get("gid")}
						onChange={(e) => {
							setSearchParams((prev) => ({ ...Object.fromEntries(prev), gid: e.target.value }));
						}}
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

			<Outlet />
			<Footer style={{ background: "inherit" }} />
		</div>
	);
}
