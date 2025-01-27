import React, { useState, useEffect } from "react";
import { fetchCategory } from "../../../api/tmdb";
import { tvGenres } from "../../../Data/tvGenres";
import styles from "./TvSeries.module.scss";

import MovieList from "../../MovieList/MovieList";

export default function Movies() {
	const [series, setSeries] = useState([]);
	const [genres, setGenres] = useState({});
	const [error, setError] = useState(null);

	function mapGenres(genres) {
		return genres.reduce((acc, genre) => {
			acc[genre.id] = genre.name;
			return acc;
		}, {});
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const mappedGenres = mapGenres(tvGenres);
				setGenres(mappedGenres);

				const totalPages = 12;
				const requests = Array.from({ length: totalPages }, (_, i) =>
					fetchCategory("tv-series", i + 1)
				);

				const allPages = await Promise.all(requests);
				const seriesData = allPages.flat();
				setSeries(seriesData);
			} catch (err) {
				setError(err.message);
			}
		};

		fetchData();
	}, []);

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				{<MovieList series={series} seriesGenres={genres} /* onMovieClick={onMovieClick} */ />}
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
