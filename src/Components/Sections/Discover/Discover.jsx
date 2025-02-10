import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchCategory } from "../../../api/tmdb";
import { movieGenres } from "../../../Data/movieGenres";
import { tvGenres } from "../../../Data/tvGenres";
import styles from "./Discover.module.scss";

import MovieList from "../../MovieList/MovieList";

export default function Discover() {
	const [movies, setMovies] = useState([]);
	const [series, setSeries] = useState([]);
	const [error, setError] = useState(null);
	const isSearchParamEmpty = useOutletContext();

	const moviesGenres = mapGenres(movieGenres);
	const seriesGenres = mapGenres(tvGenres);

	function mapGenres(genres) {
		const groupedGenres = Object.groupBy(genres, (genre) => genre.id);
		const mappedGenres = Object.fromEntries(
			Object.entries(groupedGenres).map(([id, genres]) => [id, genres[0].name])
		);
		return mappedGenres;
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const totalPages = 12;
				const movieRequests = Array.from({ length: totalPages }, (_, i) =>
					fetchCategory("movies", i + 1)
				);
				const seriesRequests = Array.from({ length: totalPages }, (_, i) =>
					fetchCategory("tv-series", i + 1)
				);

				const moviesPages = await Promise.all(movieRequests);
				const seriesPages = await Promise.all(seriesRequests);

				const movieData = moviesPages
					.flat()
					.filter((movie, index, self) => index === self.findIndex((m) => m.id === movie.id));
				const seriesData = seriesPages
					.flat()
					.filter((movie, index, self) => index === self.findIndex((m) => m.id === movie.id));

				setMovies(movieData);
				setSeries(seriesData);
			} catch (err) {
				setError(err.message);
			}
		};

		fetchData();
	}, []);

	if (error) console.error(error);

	return (
		<section style={!isSearchParamEmpty ? { marginTop: "0" } : {}} className={styles.section}>
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

/*

movieGenres = [
	{
		id: 28,
		name: "Filme de actiune",
	},
	{
		id: 12,
		name: "Filme de aventura",
	},
  ...
]

tvGenres = [
	{
		id: 10759,
		name: "Seriale de actiune si aventura",
	},
	{
		id: 16,
		name: "Seriale anime",
	},
  ...
];


 moviesGenresMapped = {
	28: "Filme de actiune",
	12: "Filme de aventura",
	16: "Filme anime",
  35: "Filme de comedie",
  ... 
};
 

 seriesGenresMapped = {
	28: "Seriale de actiune",
	12: "Seriale de aventura",
	16: "Seriale anime",
  35: "Seriale de comedie".
  ...
};
 */
