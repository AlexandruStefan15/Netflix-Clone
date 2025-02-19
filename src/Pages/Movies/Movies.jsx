import React, { useEffect, useState } from "react";
import styles from "./Movies.module.scss";
import { useFetchCategory } from "../../hooks/useFetchCategory";
import { useFetchGenre } from "../../hooks/useFetchGenre";
import { useMovieImages } from "../../hooks/useMovieImages";
import { movieGenres } from "../../Data/movieGenres";
import { useSearchParams } from "react-router-dom";
import { getBannerData } from "../../Data/heroBannerData";
import { Subheader } from "../../Components/Header/Header";
import { mapGenres, getFirstSentence } from "../../utils/helpers";
import { movieTrailers } from "../../Assets/videos/videos";

import MovieList from "../../Components/MovieList/MovieList";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";
import Loader from "../../Components/Loader/Loader";
import Select, { Option } from "../../Components/Select/Select";

export default function Movies() {
	const [searchParams, setSearchParams] = useSearchParams();
	const genreId = searchParams.get("gid");
	const genres = mapGenres(movieGenres);
	const genresTopTitles = mapGenres(movieGenres, "topTitleId");
	const startPage = 15;
	const totalPages = 12;
	const { data: moviesByCategory, error: categoryError } = useFetchCategory(
		"movies",
		startPage,
		totalPages
	);
	const { data: moviesByGenre, error: genreError, loading, fetchByGenre } = useFetchGenre();
	const { logo, backdrop, description } = useMovieImages(genresTopTitles[genreId]);
	const bannerData = genreId
		? {
				image: `https://image.tmdb.org/t/p/original/${backdrop}`,
				video: movieTrailers[genreId] || null,
				movieLogo: `https://image.tmdb.org/t/p/original/${logo}`,
				subtitle: getFirstSentence(description),
		  }
		: getBannerData("set1", "/browse/movies");

	useEffect(() => {
		if (genreId) {
			fetchByGenre(genreId, 4, "movie"); // fetch 4 pages
		}
	}, [genreId]);

	if (categoryError || genreError) console.error(categoryError || genreError);

	if (loading)
		return (
			<div className={styles.loaderWrapper}>
				<Loader />
			</div>
		);

	return (
		<>
			<Subheader className={styles.subheader}>
				<h1 className={styles.title}>Filme</h1>
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
					{movieGenres.map(
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
			<section className={styles.section}>
				<div className={styles.container}>
					{genreId ? (
						<MovieList className={styles.movieList} movies={moviesByGenre} simpleList />
					) : (
						<MovieList movies={moviesByCategory} moviesGenres={genres} />
					)}
				</div>
			</section>
		</>
	);
}

/* 
mappedGenres = {
	28: "Filme de actiune",
	12: "Filme de aventura",
	16: "Filme anime",
  ...
};  
 */
