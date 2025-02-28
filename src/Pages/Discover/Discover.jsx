import React, { useState, useEffect } from "react";
import { fetchCategory } from "../../api/tmdb";
import { movieGenres } from "../../Data/movieGenres";
import { tvGenres } from "../../Data/tvGenres";
import styles from "./Discover.module.scss";
import { getBannerData } from "../../Data/heroBannerData";
import { mapGenres } from "../../utils/helpers";
import { isSmartTV } from "../../utils/helpers";

import MovieList from "../../Components/MovieList/MovieList";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";

export default function Discover() {
	const [movies, setMovies] = useState([]);
	const [series, setSeries] = useState([]);
	const [error, setError] = useState(null);
	const isTV = isSmartTV();
	const moviesGenres = mapGenres(movieGenres);
	const seriesGenres = mapGenres(tvGenres);
	const bannerData = getBannerData("set1", "/browse");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const totalPages = isTV ? 4 : 9;
				const movieRequests = Array.from({ length: totalPages }, (_, i) =>
					fetchCategory("movies", i + 1)
				);
				const seriesRequests = Array.from({ length: totalPages }, (_, i) =>
					fetchCategory("tv-series", i + 1)
				);

				const moviesPages = await Promise.all(movieRequests);
				const seriesPages = await Promise.all(seriesRequests);

				const movieData = moviesPages
					.flat()
					.filter((movie, index, self) => index === self.findIndex((m) => m.id === movie.id));
				const seriesData = seriesPages
					.flat()
					.filter((movie, index, self) => index === self.findIndex((m) => m.id === movie.id));

				setMovies(movieData);
				setSeries(seriesData);
			} catch (err) {
				setError(err.message);
			}
		};

		fetchData();
	}, []);

	if (error) console.error(error);

	return (
		<>
			<HeroBanner
				image={bannerData?.image}
				video={bannerData?.video}
				movieLogo={bannerData?.movieLogo}
				subtitle={bannerData?.subtitle}
				movieLinks={true}
				className={styles.heroBanner}
				variant="2"
				shouldTranslate={false}
			/>
			<section className={styles.moviesAndSeries}>
				<MovieList
					movies={movies}
					series={series}
					moviesGenres={moviesGenres}
					seriesGenres={seriesGenres}
					className="movies"
					minMoviesNr={isTV && 16}
					minSeriesNr={isTV && 16}
				/>
			</section>
		</>
	);
}

/*

movieGenres = [
	{
		id: 28,
		name: "Filme de actiune",
	},
	{
		id: 12,
		name: "Filme de aventura",
	},
  ...
]

tvGenres = [
	{
		id: 10759,
		name: "Seriale de actiune si aventura",
	},
	{
		id: 16,
		name: "Seriale anime",
	},
  ...
];


 moviesGenresMapped = {
	28: "Filme de actiune",
	12: "Filme de aventura",
	16: "Filme anime",
  35: "Filme de comedie",
  ... 
};
 

 seriesGenresMapped = {
	28: "Seriale de actiune",
	12: "Seriale de aventura",
	16: "Seriale anime",
  35: "Seriale de comedie".
  ...
};
 */
