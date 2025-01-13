import React, { useState, useEffect } from "react";
import { fetchCategory } from "../../../api/tmdb";
import { movieGenres } from "../../../Data/movieGenres";
import styles from "./Discover.module.scss";

import MovieList from "../../MovieList/MovieList";

export default function Discover() {
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState({});
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const genreMap = movieGenres.reduce((acc, genre) => {
					acc[genre.id] = genre.name;
					return acc;
				}, {});

				setGenres(genreMap);

				for (let page = 1; page <= 8; page++) {
					const movieData = await fetchCategory("discover", page);
					setMovies((prev) => [...prev, ...movieData]);
				}
			} catch (err) {
				setError(err.message);
			}
		};

		fetchData();
	}, []);

	if (error) console.log(error);

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				{<MovieList movies={movies} genres={genres} /* onMovieClick={onMovieClick} */ />}
			</div>
		</section>
	);
}
