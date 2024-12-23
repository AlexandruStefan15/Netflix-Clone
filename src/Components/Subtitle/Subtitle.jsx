import React from "react";
import styles from "./Subtitle.module.scss";

export default function Subtitle({ className = "", children, variant = "", ...props }) {
	return (
		<h2 className={styles[`subtitle${variant}`] + ` ${className}`} {...props}>
			{children}
		</h2>
	);
}
