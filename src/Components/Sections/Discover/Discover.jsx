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

				const totalPages = 10;
				const requests = Array.from({ length: totalPages }, (_, i) =>
					fetchCategory("discover", i + 1)
				);

				const allPages = await Promise.all(requests);
				const movieData = allPages.flat();
				setMovies(movieData);
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

/* genres = {
	28: "Filme de actiune",
	12: "Filme de aventura",
	16: "Filme anime",
  ...
};
 */
