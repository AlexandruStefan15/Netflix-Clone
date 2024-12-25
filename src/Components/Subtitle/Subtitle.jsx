import React from "react";
import styles from "./Subtitle.module.scss";

const Subtitle = React.forwardRef(({ className = "", children, variant = "", ...props }, ref) => {
	return (
		<h2 className={styles[`subtitle${variant}`] + ` ${className}`} ref={ref} {...props}>
			{children}
		</h2>
	);
});

export default Subtitle;
