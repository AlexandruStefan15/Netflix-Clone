import React, { useState, useEffect } from "react";
import styles from "./TvSeries.module.scss";
import { tvGenres } from "../../Data/tvGenres";
import { useFetchCategory } from "../../hooks/useFetchCategory";
import { getBannerData } from "../../Data/heroBannerData";
import { useFetchGenre } from "../../hooks/useFetchGenre";
import { mapGenres, getFirstSentence } from "../../utils/helpers";
import { useSearchParams, useOutletContext } from "react-router-dom";
import { useMovieImages } from "../../hooks/useMovieImages";
import { isSmartTV } from "../../utils/helpers";
import { tvTrailers } from "../../Assets/videos/videos";
import images from "../../Assets/images/images";

import MovieList from "../../Components/MovieList/MovieList";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";
import Loader from "../../Components/Loader/Loader";
import { Subheader } from "../../Components/Header/Header";
import Select, { Option } from "../../Components/Select/Select";
import FeaturedShow from "../../Components/Sections/FeaturedShow/FeaturedShow";

export default function TvSeries() {
	const [searchParams, setSearchParams] = useSearchParams();
	const isTV = isSmartTV();
	const { isMobile, isTop } = useOutletContext();
	const genreId = searchParams.get("gid");
	const genres = mapGenres(tvGenres, "name");
	const featuredShows = mapGenres(tvGenres, "featured");
	const genresTopTitles = mapGenres(tvGenres, "topTitleId");
	const startPage = 15;
	const totalPages = isTV ? 6 : 12;
	const { data: seriesByCategory, error } = useFetchCategory("tv-series", startPage, totalPages);
	const { data: moviesByGenre, error: genreError, loading, fetchByGenre } = useFetchGenre();
	const { logo, backdrop, description } = useMovieImages(genresTopTitles[genreId], "tv");
	const bannerData = genreId
		? {
				image: backdrop,
				video: tvTrailers[genreId],
				movieLogo: logo,
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
		<main className={styles.main}>
			{isMobile ? (
				<>
					<div className={styles.categoryWrapper}>
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
							{tvGenres.map(
								(genre) =>
									genre.topTitleId && (
										<Option key={genre.id} value={genre.id}>
											{genre.shortName}
										</Option>
									)
							)}
						</Select>
					</div>
					<FeaturedShow
						className={styles.featuredShow}
						poster={genreId ? featuredShows[genreId].poster : images.aliceBorderlandPoster}
					/>
				</>
			) : (
				<>
					<Subheader
						className={
							styles.subheader + (isTV ? ` ${styles.isTV}` : "") + (isTop ? ` ${styles.isTop}` : "")
						}
					>
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
							{tvGenres.map(
								(genre) =>
									genre.topTitleId && (
										<Option key={genre.id} value={genre.id}>
											{genre.shortName}
										</Option>
									)
							)}
						</Select>
					</Subheader>
					<HeroBanner
						{...bannerData}
						movieLinks={true}
						className={styles.heroBanner}
						variant="2"
						shouldTranslate={false}
					/>
				</>
			)}
			<section className={styles.section}>
				<div className={styles.container}>
					{genreId ? (
						<MovieList className={styles.simpleMovieList} movies={moviesByGenre} simpleList />
					) : (
						<MovieList series={seriesByCategory} seriesGenres={genres} />
					)}
				</div>
			</section>
		</main>
	);
}

/* mappedGenres = {
	28: "Filme de actiune",
	12: "Filme de aventura",
	16: "Filme anime",
  ...
};
 */
