import React from "react";
import styles from "./FeaturedShow.module.scss";

import MovieCard from "../../MovieCard/MovieCard";

export default function FeaturedShow({ poster, className = "" }) {
	return (
		<section className={styles.section + ` ${className}`}>
			<div className={styles.container}>
				<MovieCard className={styles.movieCard} image={poster} />
			</div>
		</section>
	);
}
