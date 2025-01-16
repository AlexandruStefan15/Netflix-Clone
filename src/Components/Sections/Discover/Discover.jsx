import React, { useState, useEffect } from "react";
import { fetchCategory } from "../../../api/tmdb";
import { movieGenres } from "../../../Data/movieGenres";
import { tvGenres } from "../../../Data/tvGenres";
import styles from "./Discover.module.scss";

import MovieList from "../../MovieList/MovieList";

export default function Discover() {
	const [movies, setMovies] = useState([]);
	const [series, setSeries] = useState([]);
	const [moviesGenres, setMoviesGenres] = useState({});
	const [seriesGenres, setSeriesGenres] = useState({});
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
				const moviesMappedGenres = mapGenres(movieGenres);
				const seriesMappedGenres = mapGenres(tvGenres);

				setMoviesGenres(moviesMappedGenres);
				setSeriesGenres(seriesMappedGenres);

				const totalPages = 10;
				const movieRequests = Array.from({ length: totalPages }, (_, i) =>
					fetchCategory("discover", i + 1)
				);
				const seriesRequests = Array.from({ length: totalPages }, (_, i) =>
					fetchCategory("tv-series", i + 1)
				);

				const moviesPages = await Promise.all(movieRequests);
				const seriesPages = await Promise.all(seriesRequests);

				const movieData = moviesPages.flat();
				const seriesData = seriesPages.flat();

				setMovies(movieData);
				setSeries(seriesData);
			} catch (err) {
				setError(err.message);
			}
		};

		fetchData();
	}, []);

	if (error) return <p style={{ color: "red" }}>{error}</p>;

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				{
					<MovieList
						movies={movies}
						series={series}
						moviesGenres={moviesGenres}
						seriesGenres={seriesGenres}
					/>
				}
			</div>
		</section>
	);
}

/* moviesGenresMap = {
	28: "Filme de actiune",
	12: "Filme de aventura",
	16: "Filme anime",
  35: "Filme de comedie",
  ... 
};
 */

/* seriesGenresMap = {
	28: "Seriale de actiune",
	12: "Seriale de aventura",
	16: "Seriale anime",
  35: "Seriale de comedie".
  ...
};
 */
