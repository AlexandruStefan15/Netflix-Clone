import React from "react";
import svgs from "../../Assets/svgs/svgs";
import styles from "./Header.module.scss";

import Navbar from "../Navbar/Navbar";

export default function Header({ className = "", navbarClassName = "", navbarProps, ...props }) {
	return (
		<header className={styles.section + ` ${className}`} {...props}>
			<Navbar logo_path={svgs.netflix_logo} {...navbarProps} />
		</header>
	);
}
