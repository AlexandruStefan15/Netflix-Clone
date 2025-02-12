import React from "react";
import styles from "./Movies.module.scss";
import { useFetchCategory } from "../../../hooks/useFetchCategory";
import { movieGenres } from "../../../Data/movieGenres";

import MovieList from "../../MovieList/MovieList";

export default function Movies() {
	const genres = mapGenres(movieGenres);
	const startPage = 15;
	const totalPages = 12;
	const { data, error } = useFetchCategory("movies", startPage, totalPages);

	function mapGenres(genres) {
		const groupedGenres = Object.groupBy(genres, (genre) => genre.id);
		const mappedGenres = Object.fromEntries(
			Object.entries(groupedGenres).map(([id, genres]) => [id, genres[0].name])
		);
		return mappedGenres;
	}

	if (error) console.error(error);

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<MovieList movies={data} moviesGenres={genres} />
			</div>
		</section>
	);
}

/* 
mappedGenres = {
	28: "Filme de actiune",
	12: "Filme de aventura",
	16: "Filme anime",
  ...
};  
 */
