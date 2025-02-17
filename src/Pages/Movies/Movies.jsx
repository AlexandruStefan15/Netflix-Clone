import React, { useEffect } from "react";
import styles from "./Movies.module.scss";
import { useFetchCategory } from "../../hooks/useFetchCategory";
import { useFetchGenre } from "../../hooks/useFetchGenre";
import { movieGenres } from "../../Data/movieGenres";
import { useSearchParams } from "react-router-dom";
import { getBannerData } from "../../Data/heroBannerData";
import { Subheader } from "../../Components/Header/Header";

import MovieList from "../../Components/MovieList/MovieList";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";
import Loader from "../../Components/Loader/Loader";

export default function Movies() {
	const [searchParams] = useSearchParams();
	const bannerData = getBannerData("set1", "/browse/movies");
	const startPage = 15;
	const totalPages = 12;
	const { data: moviesByCategory, error: categoryError } = useFetchCategory(
		"movies",
		startPage,
		totalPages
	);
	const { data: moviesByGenre, error: genreError, loading, fetchByGenre } = useFetchGenre();
	const genreId = searchParams.get("gid");
	const genres = mapGenres(movieGenres);

	function mapGenres(genres) {
		const groupedGenres = Object.groupBy(genres, (genre) => genre.id);
		const mappedGenres = Object.fromEntries(
			Object.entries(groupedGenres).map(([id, genres]) => [id, genres[0].name])
		);
		return mappedGenres;
	}

	if (categoryError || genreError) console.error(categoryError || genreError);

	useEffect(() => {
		if (genreId) {
			fetchByGenre(genreId, 4, "movie"); // fetch 4 pages
		}
	}, [genreId]);

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
