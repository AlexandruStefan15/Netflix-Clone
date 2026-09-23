import { useState, useEffect } from "react";
import { fetchCategory } from "../api/tmdb";

export const useFetchCategory = (category, startPage, totalPages) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const requests = Array.from({ length: totalPages }, (_, i) => fetchCategory(category, startPage + i));

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

		fetchData();
	}, [category, startPage, totalPages]);

	return { data, loading, error };
};
