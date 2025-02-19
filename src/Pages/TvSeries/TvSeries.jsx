import React, { useState, useEffect } from "react";
import styles from "./TvSeries.module.scss";
import { tvGenres } from "../../Data/tvGenres";
import { useFetchCategory } from "../../hooks/useFetchCategory";
import { getBannerData } from "../../Data/heroBannerData";
import { useFetchGenre } from "../../hooks/useFetchGenre";
import { useSearchParams } from "react-router-dom";
import { mapGenres, getFirstSentence } from "../../utils/helpers";
import { useMovieImages } from "../../hooks/useMovieImages";

import MovieList from "../../Components/MovieList/MovieList";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";
import Loader from "../../Components/Loader/Loader";
import { Subheader } from "../../Components/Header/Header";
import Select, { Option } from "../../Components/Select/Select";

export default function TvSeries() {
	const [searchParams, setSearchParams] = useSearchParams();
	const genreId = searchParams.get("gid");
	const genres = mapGenres(tvGenres);
	const genresTopTitles = mapGenres(tvGenres, "topTitleId");
	const startPage = 15;
	const totalPages = 12;
	const { data: seriesByCategory, error } = useFetchCategory("tv-series", startPage, totalPages);
	const { data: moviesByGenre, error: genreError, loading, fetchByGenre } = useFetchGenre();
	const { logo, backdrop, description } = useMovieImages(genresTopTitles[genreId], "tv");
	const bannerData = genreId
		? {
				image: `https://image.tmdb.org/t/p/original/${backdrop}`,
				video: null,
				movieLogo: `https://image.tmdb.org/t/p/original/${logo}`,
				subtitle: getFirstSentence(description),
		  }
		: getBannerData("set1", "/browse/tv-series");

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
			<Subheader className={styles.subheader}>
				<h1 className={styles.title}>Seriale</h1>
				<Select
					value={searchParams.get("gid") || ""}
					onChange={(e) => {
						setSearchParams({ gid: e.target.value });
					}}
					className={styles.select}
					className_wrapper={styles.select_wrapper}
				>
					<Option value="" disabled hidden>
						Genuri
					</Option>
					{tvGenres.map((genre) => (
						<Option key={genre.id} value={genre.id}>
							{genre.shortName}
						</Option>
					))}
				</Select>
			</Subheader>
			<HeroBanner {...bannerData} movieLinks={true} className={styles.heroBanner} variant="2" />
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
