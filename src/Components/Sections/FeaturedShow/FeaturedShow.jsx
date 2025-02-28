import React from "react";
import styles from "./FeaturedShow.module.scss";

import MovieCard from "../../MovieCard/MovieCard";

export default function FeaturedShow({ show, className = "" }) {
	return (
		<section className={styles.section + ` ${className}`}>
			<div className={styles.container}>
				<MovieCard movie={show} />
			</div>
		</section>
	);
}
