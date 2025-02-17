import React, { forwardRef, useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import svgs from "../../Assets/svgs/svgs";
import styles from "./Header.module.scss";

import Navbar from "../Navbar/Navbar";

function Header({ className = "", navbarClassName = "", navbarProps, ...props }, ref) {
	return (
		<header ref={ref} className={styles.header + ` ${className}`} {...props}>
			<Navbar logo_path={svgs.netflix_logo} {...navbarProps} />
		</header>
	);
}

const Subheader = forwardRef(({ className = "", children, ...props }, ref) => {
	const [isTop, setIsTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsTop(window.scrollY === 0);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			ref={ref}
			className={styles.subheader + ` ${className}` + (isTop ? ` ${styles.isTop}` : "")}
			{...props}
		>
			{children}
		</div>
	);
});

export default forwardRef(Header);
export { Subheader };
