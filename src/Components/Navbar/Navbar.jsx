import React from "react";
import styles from "./Navbar.module.scss";
import { Trans, useTranslation } from "react-i18next";
import { inline_svgs } from "../../Assets/svgs/svgs";

import Link from "../Link/Link";
import { NavLink } from "react-router-dom";
import Select, { Option } from "../Select/Select";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";

export default function Navbar({
	logo_path,
	linkText = {
		value: "Conectare",
		i18nKey: "Navbar.linkText",
	},
	className = "",
	variant = "",
	selectLanguage = true,
	...props
}) {
	const { t, i18n } = useTranslation();
	const languageChange = (e) => i18n.changeLanguage(e.target.value);

	return (
		<nav className={styles[`nav${variant}`] + ` ${className}`}>
			{props.primaryNavigation ? (
				<div className={styles.primaryNavigationContainer}>
					<Logo className={styles.logo} src={logo_path} />
					<ul className={styles.primaryNavigationList}>
						{props.primaryNavigation.map((item, index) => (
							<li className={styles.listItem} key={index}>
								<NavLink className={styles.link} to={item.path}>
									{item.name}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			) : (
				<Logo className={styles.logo} src={logo_path} />
			)}

			{props.secondaryNavigation && (
				<div className={styles.secondaryNavigation}>
					<SearchBar />
					<ul className={styles.secondaryNavigationList}>
						<li>
							<NavLink to={"#"}>Copii</NavLink>
						</li>
						<li>
							<NavLink to={"#"}>{inline_svgs.ring_bell}</NavLink>
						</li>
						<li>
							<NavLink to={"#"}>{inline_svgs.account}</NavLink>
						</li>
					</ul>
				</div>
			)}
			{selectLanguage && (
				<div className={styles.selectLanguageWrapper}>
					<Select
						className={styles.select}
						name="languages"
						onChange={languageChange}
						value={i18n.language}
					>
						<Option value="ro">Romana</Option>
						<Option value="en">English</Option>
					</Select>
					<Link to="/login">
						<Trans i18nKey={linkText.i18nKey}>{{ t: linkText.value }}</Trans>
					</Link>
				</div>
			)}
		</nav>
	);
}
