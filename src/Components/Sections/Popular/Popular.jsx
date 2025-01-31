import React, { useState, useEffect } from "react";
import { fetchCategory } from "../../../api/tmdb";
import { movieGenres } from "../../../Data/movieGenres";
import styles from "./Popular.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

import MovieList from "../../MovieList/MovieList";

const customGenres = {
	9648: "Filme cu mister",
	53: "Thrillere",
	12: "Filme de aventura",
	18: "Filme dramatice",
	/* 	14: "Filme fantastice",
	16: "Filme anime",
	10749: "Filme romantice",
	28: "Filme de actiune",
	35: "Filme de comedie", */
};

export default function Popular() {
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
		const fetchData = async () => {
			try {
				const mappedGenres = mapGenres(movieGenres);
				setGenres(mappedGenres);

				const totalPages = 5;
				const requests = Array.from({ length: totalPages }, (_, i) =>
					fetchCategory("upcoming", i + 1)
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
			<div className={styles.container}>{<MovieList movies={movies} simpleList={true} />}</div>
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
