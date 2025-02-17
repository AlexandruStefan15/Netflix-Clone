import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomLayout.module.scss";
import { Outlet, useSearchParams } from "react-router-dom";

import { Subheader } from "../../Components/Header/Header";

export function CustomLayout() {
	const [isTop, setIsTop] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const subheaderRef = useRef(null);

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
		<>
			<Subheader
				className={styles.subheader + (isTop ? ` ${styles.isTop}` : "")}
				ref={subheaderRef}
			>
				<h1 className={styles.title}>{getTitle()}</h1>
				<Select
					value={searchParams.get("gid") || ""}
					onChange={(e) => {
						setSearchParams((prev) => ({ ...Object.fromEntries(prev), gid: e.target.value }));
					}}
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
			<Outlet />
		</>
	);
}
