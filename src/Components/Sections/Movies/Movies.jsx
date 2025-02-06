import React, { useState, useEffect } from "react";
import { fetchCategory } from "../../../api/tmdb";
import { movieGenres } from "../../../Data/movieGenres";
import { useOutletContext } from "react-router-dom";
import styles from "./Movies.module.scss";

import MovieList from "../../MovieList/MovieList";

export default function Movies() {
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState({});
	const [error, setError] = useState(null);
	const isSearchParamEmpty = useOutletContext();

	function mapGenres(genres) {
		const groupedGenres = Object.groupBy(genres, (genre) => genre.id);
		const mappedGenres = Object.fromEntries(
			Object.entries(groupedGenres).map(([id, genres]) => [id, genres[0].name])
		);
		return mappedGenres;
	}

	useEffect(() => {
		const mappedGenres = mapGenres(movieGenres);
		setGenres(mappedGenres);

		const fetchData = async () => {
			try {
				const totalPages = 12;
				const startPage = 15;
				const requests = Array.from({ length: totalPages }, (_, i) =>
					fetchCategory("movies", startPage + i)
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
		<section style={!isSearchParamEmpty ? { marginTop: "0" } : {}} className={styles.section}>
			<div className={styles.container}>{<MovieList movies={movies} moviesGenres={genres} />}</div>
		</section>
	);
}

/* 
mappedGenres = {
	28: "Filme de actiune",
	12: "Filme de aventura",
	16: "Filme anime",
  ...
};  
 */
