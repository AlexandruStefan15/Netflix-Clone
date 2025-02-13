import { useState } from "react";

const API_KEY = "318dc067de589bc7b276ad2334cac8d8";

const useMovieSearch = () => {
	const [results, setResults] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	const searchMovies = async (query) => {
		setLoading(true);
		setError("");
		setResults([]);

		try {
			const page1Response = await fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
					query
				)}&page=1`
			);

			if (!page1Response.ok) throw new Error("Failed to fetch search results");

			const page1Data = await page1Response.json();
			let combinedResults = page1Data.results || [];

			// If there are more pages, fetch page 2
			if (page1Data.total_pages > 1) {
				const page2Response = await fetch(
					`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
						query
					)}&page=2`
				);
				if (page2Response.ok) {
					const page2Data = await page2Response.json();
					combinedResults = [...combinedResults, ...(page2Data.results || [])];
				}
			}

			//  Ensure `combinedResults` is always an array before sorting
			const sortedResults = Array.isArray(combinedResults)
				? combinedResults.sort((a, b) => b.popularity - a.popularity)
				: [];

			setResults(sortedResults);
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
