import React, { useState, useEffect } from "react";
import videos from "../../Assets/videos/videos";
import styles from "./MovieList.module.scss";
import MovieSlider from "../MovieSlider/MovieSlider";
import { useSearchParams } from "react-router-dom";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import Modal from "../Modal/Modal";

const groupByGenre = (items) =>
	items.reduce((groupedItems, item) => {
		if (!item.genre_ids) return groupedItems;
		item.genre_ids.forEach((genre) => {
			groupedItems[genre] = groupedItems[genre] || [];
			groupedItems[genre].push(item);
		});
		return groupedItems;
	}, {});

const combineGroups = (groupedMovies, groupedSeries) => {
	let combinedGroups = {};
	const genreIds = new Set([...Object.keys(groupedMovies), ...Object.keys(groupedSeries)]);
	genreIds.forEach((genreId) => {
		const combinedMovies = [...(groupedMovies[genreId] || [])];
		const combinedSeries = [...(groupedSeries[genreId] || [])];
		combinedGroups[genreId] = {
			movies: Array.from(new Set(combinedMovies.map(JSON.stringify))).map(JSON.parse),
			series: Array.from(new Set(combinedSeries.map(JSON.stringify))).map(JSON.parse),
		};
	});
	return combinedGroups;
};

export default function MovieList({
	movies = [],
	series = [],
	moviesGenres = {},
	seriesGenres = {},
	simpleList = false,
	className = "",
}) {
	const [searchParams, setSearchParams] = useSearchParams();
	const { loading, results, searchMovies } = useMovieSearch();
	const [activeMovie, setActiveMovie] = useState(null);
	const query = searchParams.get("q");
	const effectiveMovies = query ? results : movies;

	const groupedMovies = groupByGenre(effectiveMovies);
	const groupedSeries = groupByGenre(series);
	const combinedCategory = combineGroups(groupedMovies, groupedSeries);

	useEffect(() => {
		const movieId = searchParams.get("mid");
		if (movieId) {
			const selectedMovie =
				effectiveMovies.find((movie) => movie.id.toString() === movieId) ||
				series.find((item) => item.id.toString() === movieId);
			setActiveMovie(selectedMovie);
		} else {
			setActiveMovie(null);
		}
	}, [searchParams, effectiveMovies, series]);

	useEffect(() => {
		searchMovies(query);
	}, [query]);

	/* useEffect(() => {
		
	}, [genreId]); */

	const handleMovieClick = (movie) => {
		const params = new URLSearchParams(searchParams);
		params.set("mid", movie.id);
		setSearchParams(params);
	};

	const handleCloseModal = () => {
		const params = new URLSearchParams(searchParams);
		params.delete("mid");
		setSearchParams(params);
	};

	if (loading && !searchParams.get("mid") && searchParams.get("q")) {
		return <div className={styles.loader}></div>;
	}

	if (!results.length && !loading && searchParams.get("q")) {
		return (
			<div className={styles.noResultsMessage}>
				<h2>Nu am gasit niciun rezultat pentru aceasta cautare.</h2>
				<div className={styles.video}>
					<video src={videos.sadGirl} muted autoPlay loop></video>
				</div>
			</div>
		);
	}

	if (simpleList) {
		return (
			<>
				<ul className={styles.simpleList + ` ${className}`}>
					{effectiveMovies.map(
						(movie, index) =>
							movie.poster_path && (
								<li key={index} className={styles.listItem} onClick={() => handleMovieClick(movie)}>
									<img
										src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
										alt="movie-poster"
									/>
								</li>
							)
					)}
				</ul>
				{activeMovie && <Modal movie={activeMovie} onClose={handleCloseModal} />}
			</>
		);
	}

	return (
		<>
			<ul className={styles.container}>
				{Object.keys(combinedCategory).map((genreId) => {
					const group = combinedCategory[genreId];
					const hasEnoughMovies = group.movies.length >= 8;
					const hasEnoughSeries = group.series.length >= 8;
					const moviesGenre = moviesGenres[genreId];
					const seriesGenre = seriesGenres[genreId];

					return hasEnoughMovies || hasEnoughSeries ? (
						<React.Fragment key={genreId}>
							{hasEnoughMovies && moviesGenre && (
								<div className={styles.item}>
									<h2 className={styles.title}>{moviesGenre}</h2>
									<MovieSlider handleMovieClick={handleMovieClick} movies={group.movies} />
								</div>
							)}
							{hasEnoughSeries && seriesGenre && (
								<div className={styles.item}>
									<h2 className={styles.title}>{seriesGenre}</h2>
									<MovieSlider handleMovieClick={handleMovieClick} movies={group.series} />
								</div>
							)}
						</React.Fragment>
					) : null;
				})}
				{activeMovie && <Modal movie={activeMovie} onClose={handleCloseModal} />}
			</ul>
		</>
	);
}
