import React, { forwardRef } from "react";
import svgs from "../../Assets/svgs/svgs";
import styles from "./Header.module.scss";

import Navbar from "../Navbar/Navbar";

function Header({ className = "", navbarClassName = "", navbarProps, ...props }, ref) {
	return (
		<header ref={ref} className={styles.section + ` ${className}`} {...props}>
			<Navbar logo_path={svgs.netflix_logo} {...navbarProps} />
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
