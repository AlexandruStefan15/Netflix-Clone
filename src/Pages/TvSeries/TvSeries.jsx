import React, { useState, useEffect } from "react";
import { tvGenres } from "../../Data/tvGenres";
import { useFetchCategory } from "../../hooks/useFetchCategory";
import styles from "./TvSeries.module.scss";
import { getBannerData } from "../../Data/heroBannerData";
import { useFetchGenre } from "../../hooks/useFetchGenre";
import { useSearchParams } from "react-router-dom";

import MovieList from "../../Components/MovieList/MovieList";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";
import Loader from "../../Components/Loader/Loader";

export default function TvSeries() {
	const [searchParams] = useSearchParams();

	const genres = mapGenres(tvGenres);
	const startPage = 15;
	const totalPages = 12;
	const { data: seriesByCategory, error } = useFetchCategory("tv-series", startPage, totalPages);
	const { data: moviesByGenre, error: genreError, loading, fetchByGenre } = useFetchGenre();
	const bannerData = getBannerData("set1", "/browse/tv-series");
	const genreId = searchParams.get("gid");

	function mapGenres(genres) {
		const groupedGenres = Object.groupBy(genres, (genre) => genre.id);
		const mappedGenres = Object.fromEntries(
			Object.entries(groupedGenres).map(([id, genres]) => [id, genres[0].name])
		);
		return mappedGenres;
	}

	useEffect(() => {
		if (genreId) fetchByGenre(genreId, 4, "tv"); // fetch 4 pages
	}, [genreId]);

	if (error) console.error(error);

	if (loading)
		return (
			<div className={styles.loaderWrapper}>
				<Loader />
			</div>
		);

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
			/>
			<section className={styles.section}>
				<div className={styles.container}>
					{genreId ? (
						<MovieList className={styles.movieList} movies={moviesByGenre} simpleList />
					) : (
						<MovieList series={seriesByCategory} seriesGenres={genres} />
					)}
				</div>
			</section>
		</>
	);
}

/* mappedGenres = {
	28: "Filme de actiune",
	12: "Filme de aventura",
	16: "Filme anime",
  ...
};
 */
