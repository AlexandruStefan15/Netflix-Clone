import React, { useState, useEffect } from "react";
import { fetchCategory } from "../../../api/tmdb";
import { movieGenres } from "../../../Data/movieGenres";

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

				for (let i = 1; i <= 5; i++) {
					const movieData = await fetchCategory("discover", i);
					setMovies((prev) => [...prev, ...movieData]);
				}
			} catch (err) {
				setError(err.message);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<h1>...</h1>
			{<MovieList movies={movies} genres={genres} /* onMovieClick={onMovieClick} */ />}
		</div>
	);
}
