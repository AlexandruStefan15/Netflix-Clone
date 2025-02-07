import { useState } from "react";

const useMovieSearch = () => {
	const [results, setResults] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const searchMovies = async (query) => {
		if (!query.trim()) {
			setError("Please enter a valid search term.");
			return;
		}

		setLoading(true);
		setError("");

		try {
			const [page1Response, page2Response] = await Promise.all([
				fetch(
					`https://api.themoviedb.org/3/search/movie?api_key=318dc067de589bc7b276ad2334cac8d8&query=${encodeURIComponent(
						query
					)}&page=1`
				),
				fetch(
					`https://api.themoviedb.org/3/search/movie?api_key=318dc067de589bc7b276ad2334cac8d8&query=${encodeURIComponent(
						query
					)}&page=2`
				),
			]);

			if (!page1Response.ok || !page2Response.ok) {
				throw new Error("Failed to fetch search results");
			}

			const page1Data = await page1Response.json();
			const page2Data = await page2Response.json();

			const combinedResults = [...(page1Data.results || []), ...(page2Data.results || [])];

			setResults(combinedResults);
		} catch (err) {
			console.error(err);
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return { results, error, loading, searchMovies };
};

export { useMovieSearch };
