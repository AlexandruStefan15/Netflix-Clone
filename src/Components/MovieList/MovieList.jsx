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
	const reversedKeys = Object.keys(groupedMovies).reverse();

	return (
		<>
			{reversedKeys.map((genreId, index) => {
				if (groupedMovies[genreId].length >= 7) {
					return (
						<div className={styles.container} key={index}>
							<h2 className={styles.title}>{genres[genreId]}</h2>
							<MovieSlider movies={groupedMovies[genreId]} />
						</div>
					);
				}
			})}
		</>
	);
}

/* movies = [
  { id: 1, title: "Movie A", genre_ids: [28, 12] },
  { id: 2, title: "Movie B", genre_ids: [28, 16] },
  { id: 3, title: "Movie C", genre_ids: [35] },
  { id: 4, title: "Movie D", genre_ids: [35] }
]; */

/* groupedMovies = {
  "28": [
    { id: 1, title: "Movie A", genre_ids: [28, 12] },
    { id: 2, title: "Movie B", genre_ids: [28, 16] }
  ],
  "35": [
    { id: 3, title: "Movie C", genre_ids: [35] },
    { id: 4, title: "Movie D", genre_ids: [35] }
  ]
}; */
