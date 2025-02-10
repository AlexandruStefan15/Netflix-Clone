import React, { useState, useEffect } from "react";
import { tvGenres } from "../../../Data/tvGenres";
import { useFetchCategory } from "../../../hooks/useFetchCategory";
import { useOutletContext } from "react-router-dom";
import styles from "./TvSeries.module.scss";

import MovieList from "../../MovieList/MovieList";

export default function TvSeries() {
	const isSearchParamEmpty = useOutletContext();
	const genres = mapGenres(tvGenres);
	const startPage = 10;
	const totalPages = 12;
	const { data, error } = useFetchCategory("tv-series", startPage, totalPages);

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
				<MovieList series={data} seriesGenres={genres} />
			</div>
		</section>
	);
}

/* mappedGenres = {
	28: "Filme de actiune",
	12: "Filme de aventura",
	16: "Filme anime",
  ...
};
 */
