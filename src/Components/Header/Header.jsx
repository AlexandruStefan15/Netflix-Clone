import React, { forwardRef, useState, useEffect } from "react";
import svgs from "../../Assets/svgs/svgs";
import images from "../../Assets/images/images";
import styles from "./Header.module.scss";
import { useOutletContext } from "react-router-dom";

import Navbar from "../Navbar/Navbar";

function Header({ className = "", navbarClassName = "", navbarProps, ...props }, ref) {
	return (
		<header ref={ref} className={styles.header + ` ${className}`} {...props}>
			<Navbar logo_path={images.logo} {...navbarProps} />
		</header>
	);
}

const Subheader = forwardRef(({ className = "", children, ...props }, ref) => {
	return (
		<div ref={ref} className={styles.subheader + ` ${className}`} {...props}>
			{children}
		</div>
	);
});

export default forwardRef(Header);
export { Subheader };
