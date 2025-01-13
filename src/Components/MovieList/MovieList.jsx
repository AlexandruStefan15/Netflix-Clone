import React from "react";
import styles from "./MovieList.module.scss";

import MovieSlider from "../MovieSlider/MovieSlider";

const groupByGenre = (movies) => {
	return movies.reduce((acc, movie) => {
		if (!movie.genre_ids) return acc;

		movie.genre_ids.forEach((genre) => {
			if (!acc[genre]) {
				acc[genre] = [];
			}
			acc[genre].push(movie);
		});
		return acc;
	}, {});
};

export default function MovieList({ movies, genres }) {
	const groupedMovies = groupByGenre(movies);

	return (
		<>
			{Object.keys(groupedMovies).map((genreId, index) => {
				if (groupedMovies[genreId].length >= 7) {
					return (
						<div className={styles.container} key={index}>
							<h2 className={styles.title}>{genres[genreId]} movies</h2>
							<MovieSlider movies={groupedMovies[genreId]} />
						</div>
					);
				}
			})}
		</>
	);
}
