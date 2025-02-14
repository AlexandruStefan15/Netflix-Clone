import { useState, useEffect } from "react";
import { fetchGenre } from "../api/tmdb";

export const useFetchGenre = () => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchByGenre = async (genreId, totalPages, type) => {
		setLoading(true);
		setError("");

		try {
			const requests = Array.from({ length: totalPages }, (_, i) =>
				fetchGenre(genreId, i + 1, type)
			);

			const allPages = await Promise.all(requests);
			const movieData = allPages
				.flat()
				.filter((movie, index, self) => index === self.findIndex((m) => m.id === movie.id));

			setData(movieData);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return { data, error, loading, fetchByGenre };
};
