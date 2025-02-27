import { useState, useEffect } from "react";

const API_KEY = "318dc067de589bc7b276ad2334cac8d8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const useMovieImages = (movieId, type = "movie") => {
	const [logo, setLogo] = useState(null);
	const [backdrop, setBackdrop] = useState(null);
	const [description, setDescription] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!movieId) return;

		const fetchMovieImages = async () => {
			setLoading(true);
			try {
				const detailsResponse = await fetch(
					`${BASE_URL}/${type}/${movieId}?api_key=${API_KEY}&language=en-US`
				);

				if (!detailsResponse.ok) throw new Error("Failed to fetch movie details");

				const detailsData = await detailsResponse.json();

				const imagesResponse = await fetch(
					`${BASE_URL}/${type}/${movieId}/images?api_key=${API_KEY}&include_image_language=en,null`
				);

				if (!imagesResponse.ok) throw new Error("Failed to fetch images");

				const data = await imagesResponse.json();

				const description = detailsData.overview;
				const logoPath = `https://image.tmdb.org/t/p/original/${data.logos[0].file_path}`;
				const backdropPath = `https://image.tmdb.org/t/p/original/${data.backdrops[0].file_path}`;

				setDescription(description);
				setLogo(logoPath);
				setBackdrop(backdropPath);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchMovieImages();
	}, [movieId]);

	return { description, logo, backdrop, loading, error };
};

export { useMovieImages };
