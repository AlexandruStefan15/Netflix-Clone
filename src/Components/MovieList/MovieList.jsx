import React from "react";
import styles from "./MovieList.module.scss";

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

export default function MovieList({ movies, genres, className = "" }) {
	const groupedMovies = groupByGenre(movies);

	return (
		<div className={styles.movieList + ` ${className}`}>
			{Object.keys(groupedMovies).map((genreId) => (
				<div key={genreId}>
					<h2>{genres[genreId] || "Unknown Genre"}</h2>
					<ul>
						{groupedMovies[genreId].map((movie) => {
							return <li key={movie.id}>{movie.title}</li>;
						})}
					</ul>
				</div>
			))}
		</div>
	);
}
