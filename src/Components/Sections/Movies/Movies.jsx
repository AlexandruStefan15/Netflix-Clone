import React, { useEffect } from "react";
import styles from "./Movies.module.scss";
import { useFetchCategory } from "../../../hooks/useFetchCategory";
import { useFetchGenre } from "../../../hooks/useFetchGenre";
import { movieGenres } from "../../../Data/movieGenres";
import { useSearchParams } from "react-router-dom";

import MovieList from "../../MovieList/MovieList";

export default function Movies() {
	const [searchParams] = useSearchParams();
	const genres = mapGenres(movieGenres);
	const startPage = 15;
	const totalPages = 12;
	const { data: moviesByCategory, error: categoryError } = useFetchCategory(
		"movies",
		startPage,
		totalPages
	);
	const { data: moviesByGenre, error: genreError, loading, fetchByGenre } = useFetchGenre();
	const genreId = searchParams.get("gid");

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
			fetchByGenre(genreId, 4, "movie");
		}
	}, [genreId]);

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				{genreId ? (
					<MovieList movies={moviesByGenre} simpleList />
				) : (
					<MovieList movies={moviesByCategory} moviesGenres={genres} />
				)}
			</div>
		</section>
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
