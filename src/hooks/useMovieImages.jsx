import { useState, useEffect } from "react";

const API_KEY = "318dc067de589bc7b276ad2334cac8d8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const useMovieImages = (movieId) => {
	const [logo, setLogo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!movieId) return;

		const fetchMovieImages = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}&include_image_language=en,null`
				);

				if (!response.ok) throw new Error("Failed to fetch images");

				const data = await response.json();
				const logoPath = data.logos[0].file_path;

				setLogo(logoPath);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchMovieImages();
	}, [movieId]);

	return { logo, loading, error };
};

export default useMovieImages;
