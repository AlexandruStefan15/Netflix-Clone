import React, { useState, useEffect } from "react";
import { useFetchCategory } from "../../../hooks/useFetchCategory";
import { movieGenres } from "../../../Data/movieGenres";
import { useOutletContext } from "react-router-dom";
import styles from "./Movies.module.scss";

import MovieList from "../../MovieList/MovieList";

export default function Movies() {
	const isSearchParamEmpty = useOutletContext();
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
		<section style={!isSearchParamEmpty ? { marginTop: "0" } : {}} className={styles.section}>
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
