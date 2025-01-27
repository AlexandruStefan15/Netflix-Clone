import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useMovieSearchParams(movies) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [activeMovie, setActiveMovie] = useState(null);

	useEffect(() => {
		const movieId = searchParams.get("mid");
		if (movieId) {
			const selectedMovie = movies.find((movie) => movie.id.toString() === movieId);
			setActiveMovie(selectedMovie || null);
		}
	}, [searchParams, movies]);

	const handleMovieClick = (movie) => {
		setActiveMovie(movie);
		setSearchParams({ mid: movie.id });
	};

	const handleCloseModal = () => {
		setActiveMovie(null);
		setSearchParams({});
	};

	return { activeMovie, handleMovieClick, handleCloseModal };
}
