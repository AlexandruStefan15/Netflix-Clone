import React, { useState, useEffect } from "react";
import { tvGenres } from "../../../Data/tvGenres";
import { useFetchCategory } from "../../../hooks/useFetchCategory";
import styles from "./TvSeries.module.scss";

import MovieList from "../../MovieList/MovieList";

export default function TvSeries() {
	const [series, setSeries] = useState([]);
	const [genres, setGenres] = useState({});
	const startPage = 10;
	const totalPages = 12;
	const { data, error } = useFetchCategory("tv-series", startPage, totalPages);

	function mapGenres(genres) {
		return genres.reduce((acc, genre) => {
			acc[genre.id] = genre.name;
			return acc;
		}, {});
	}

	useEffect(() => {
		const mappedGenres = mapGenres(tvGenres);
		setGenres(mappedGenres);
		setSeries(data);
	}, [data]);

	if (error) return <p style={{ color: "red" }}>{error}</p>;

	return (
		<section className={styles.section}>
			<div className={styles.container}>{<MovieList series={series} seriesGenres={genres} />}</div>
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
