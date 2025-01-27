import React, { useState, useEffect } from "react";
import { fetchCategory } from "../../../api/tmdb";
import { movieGenres } from "../../../Data/movieGenres";
import styles from "./Movies.module.scss";

import MovieList from "../../MovieList/MovieList";

export default function Movies() {
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState({});
	const [error, setError] = useState(null);

	function mapGenres(genres) {
		return genres.reduce((acc, genre) => {
			acc[genre.id] = genre.name;
			return acc;
		}, {});
	}

	useEffect(() => {
		const mappedGenres = mapGenres(movieGenres);
		setGenres(mappedGenres);

		const fetchData = async () => {
			try {
				const totalPages = 11;
				const requests = Array.from({ length: totalPages }, (_, i) =>
					fetchCategory("movies", i + 1)
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

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				{<MovieList movies={movies} moviesGenres={genres} /* onMovieClick={onMovieClick} */ />}
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
