import React, { useState, useEffect, createContext } from "react";
import styles from "./Browse.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { getBannerData } from "../../Data/heroBannerData";

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
	const [searchParams, setSearchParams] = useSearchParams();

	const location = useLocation();

	useEffect(() => {
		setBannerData(getBannerData("set1", location.pathname));
		if (["/browse/popular", "/browse/search"].includes(location.pathname)) {
			setShowBanner(false);
		} else setShowBanner(true);
	}, [location.pathname]);

	const isSearchParamEmpty = () => {
		return !searchParams.get("search");
	};

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
			<Subheader className={styles.subheader}>
				<h1>Filme</h1>
				<Select className={styles.select} className_wrapper={styles.select_wrapper}>
					<Option value="1">Genuri</Option>
					<Option value="2">Option 2</Option>
					<Option value="3">Option 3</Option>
					<Option value="3">Option 3</Option>
					<Option value="3">Option 3</Option>
					<Option value="3">Option 3</Option>
					<Option value="3">Option 3</Option>
					<Option value="3">Option 3</Option>
					<Option value="3">Option 3</Option>
					<Option value="3">Option 3</Option>
				</Select>
			</Subheader>
			{showBanner && isSearchParamEmpty() && (
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
			<Outlet context={isSearchParamEmpty()} />
			<Footer style={{ background: "inherit" }} />
		</div>
	);
}
