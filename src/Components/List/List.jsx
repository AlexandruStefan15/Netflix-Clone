import React from "react";
import styles from "./List.module.scss";

export default function List({ children, className = "", items, ...props }) {
	if (!children)
		return (
			<div className={styles.list + ` ${className}`}>
				This is a title
				<ul>{items && items.map((item, index) => <li key={index}>{item}</li>)}</ul>
			</div>
		);

	return <p>{children}</p>;
}
