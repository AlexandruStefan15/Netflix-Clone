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
import Select, { Option } from "../../Components/Select/Select";

export default function Movies() {
	const [searchParams, setSearchParams] = useSearchParams();
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

	console.log(moviesByGenre);

	return (
		<>
			<Subheader className={styles.subheader}>
				<h1 className={styles.title}>Filme</h1>
				<Select
					value={searchParams.get("gid") || ""}
					onChange={(e) => {
						setSearchParams((prev) => ({ ...Object.fromEntries(prev), gid: e.target.value }));
					}}
					className={styles.select}
					className_wrapper={styles.select_wrapper}
				>
					<Option value="" disabled hidden>
						Genuri
					</Option>
					{movieGenres.map((genre) => (
						<Option key={genre.id} value={genre.id}>
							{genre.shortName}
						</Option>
					))}
				</Select>
			</Subheader>
			<HeroBanner
				image={
					genreId
						? `https://image.tmdb.org/t/p/original/${moviesByGenre[0]?.backdrop_path}`
						: bannerData?.image
				}
				video={genreId ? null : bannerData?.video}
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
