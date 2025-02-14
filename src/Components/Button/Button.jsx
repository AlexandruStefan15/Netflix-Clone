import React from "react";
import styles from "./Button.module.scss";

export default function Button({ className = "", children, variant = "", ...props }) {
	return (
		<button className={styles[`btn${variant}`] + ` ${className}`} {...props}>
			{children}
		</button>
	);
}
