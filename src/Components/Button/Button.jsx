import React from "react";
import styles from "./Button.module.scss";

export default function Button({ className = "", children, variant, ...props }) {
	return (
		<button data-variant={variant} className={styles.btn + ` ${className}`} {...props}>
			{children}
		</button>
	);
}
