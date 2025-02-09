import React, { useState, useEffect } from "react";
import styles from "./MovieList.module.scss";
import MovieSlider from "../MovieSlider/MovieSlider";
import { useSearchParams } from "react-router-dom";
import { useMovieSearch } from "../../hooks/useMovieSearch";
import Modal from "../Modal/Modal";
import { use } from "react";

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
}) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [activeMovie, setActiveMovie] = useState(null);
	const { searchMovies, results, loading } = useMovieSearch();

	const query = searchParams.get("search");
	const effectiveMovies = query ? results : movies;
	const effectiveSeries = series;
	const showSimpleList = query ? true : simpleList;
	const groupedMovies = groupByGenre(effectiveMovies);
	const groupedSeries = groupByGenre(effectiveSeries);
	const combinedCategory = combineGroups(groupedMovies, groupedSeries);

	useEffect(() => {
		const movieId = searchParams.get("mid");

		if (movieId) {
			const selectedMovie =
				effectiveMovies.find((movie) => movie.id.toString() === movieId) ||
				effectiveSeries.find((item) => item.id.toString() === movieId);
			setActiveMovie(selectedMovie || null);
		} else {
			setActiveMovie(null);
		}
	}, [searchParams, effectiveMovies, effectiveSeries]);

	useEffect(() => {
		if (query) {
			searchMovies(query);
		}
	}, [searchParams]);

	const handleMovieClick = (movie) => {
		setActiveMovie(movie);
		const params = new URLSearchParams(searchParams);
		params.set("mid", movie.id);
		setSearchParams(params);
	};

	const handleCloseModal = () => {
		setActiveMovie(null);
		const params = new URLSearchParams(searchParams);
		params.delete("mid");
		setSearchParams(params);
	};

	if (loading && !searchParams.get("mid")) {
		return <div className={styles.loader}></div>;
	}

	if (!results.length && searchParams.get("search")) {
		return (
			<div className={styles.noResultsMessage}>
				<h2>Nu am gasit niciun rezultat care sa corespunda criteriilor tale de cautare...</h2>
			</div>
		);
	}

	if (showSimpleList) {
		return (
			<>
				<ul className={styles.simpleList}>
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
			{Object.keys(combinedCategory).map((genreId) => {
				const group = combinedCategory[genreId];
				const hasEnoughMovies = group.movies.length >= 8;
				const hasEnoughSeries = group.series.length >= 8;
				const moviesGenre = moviesGenres[genreId];
				const seriesGenre = seriesGenres[genreId];

				return hasEnoughMovies || hasEnoughSeries ? (
					<React.Fragment key={genreId}>
						{hasEnoughMovies && moviesGenre && (
							<div className={styles.container}>
								<h2 className={styles.title}>{moviesGenre}</h2>
								<MovieSlider handleMovieClick={handleMovieClick} movies={group.movies} />
							</div>
						)}
						{hasEnoughSeries && seriesGenre && (
							<div className={styles.container}>
								<h2 className={styles.title}>{seriesGenre}</h2>
								<MovieSlider handleMovieClick={handleMovieClick} movies={group.series} />
							</div>
						)}
					</React.Fragment>
				) : null;
			})}
			{activeMovie && <Modal movie={activeMovie} onClose={handleCloseModal} />}
		</>
	);
}
