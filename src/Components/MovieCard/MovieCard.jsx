import React from "react";
import styles from "./MovieCard.module.scss";

export default function MovieCard({ image, className = "" }) {
	return (
		<div className={styles.card + ` ${className}`}>
			<div className={styles.image}>
				<img src={image} alt="Movie poster" />
			</div>
			<footer className={styles.footer}></footer>
		</div>
	);
}
