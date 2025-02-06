import React, { useState, useEffect } from "react";
import { tvGenres } from "../../../Data/tvGenres";
import { useFetchCategory } from "../../../hooks/useFetchCategory";
import { useOutletContext } from "react-router-dom";
import styles from "./TvSeries.module.scss";

import MovieList from "../../MovieList/MovieList";

export default function TvSeries() {
	const [series, setSeries] = useState([]);
	const [genres, setGenres] = useState({});
	const startPage = 10;
	const totalPages = 12;
	const { data, error } = useFetchCategory("tv-series", startPage, totalPages);
	const isSearchParamEmpty = useOutletContext();

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

	if (error) console.error(error);

	return (
		<section style={!isSearchParamEmpty ? { marginTop: "0" } : {}} className={styles.section}>
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
