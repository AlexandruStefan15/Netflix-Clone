const API_KEY = "318dc067de589bc7b276ad2334cac8d8";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchCategory = async (category, page) => {
	const today = new Date().toISOString().split("T")[0];

	const endpoints = {
		movies: `/discover/movie`,
		"tv-series": `/discover/tv`,
		popular: `/movie/popular`,
		upcoming: `/discover/movie`,
	};

	try {
		const response = await fetch(
			`${BASE_URL}${endpoints[category]}?api_key=${API_KEY}${page ? `&page=${page}` : ""}${
				category === "upcoming" ? `&primary_release_date.gte=${today}` : ""
			}`
		);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		return data.results;
	} catch (err) {
		console.error(err);
		throw err;
	}
};
