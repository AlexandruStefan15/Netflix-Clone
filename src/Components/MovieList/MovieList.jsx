import React, { useState, useEffect } from "react";
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
}) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [activeMovie, setActiveMovie] = useState(null);
	const [moviesData, setMoviesData] = useState(movies);
	const [seriesData, setSeriesData] = useState(series);
	const [showSimpleList, setShowSimpleList] = useState(simpleList);
	const { searchMovies, results } = useMovieSearch();

	const groupedMovies = groupByGenre(movies);
	const groupedSeries = groupByGenre(series);
	const combinedCategory = combineGroups(groupedMovies, groupedSeries);

	const shallowEqual = (arr1, arr2) => {
		if (arr1 === arr2) return true;
		if (arr1.length !== arr2.length) return false;
		return arr1.every((item, index) => item === arr2[index]);
	};

	useEffect(() => {
		const movieId = searchParams.get("mid");
		if (movieId) {
			const selectedMovie =
				moviesData.find((movie) => movie.id.toString() === movieId) ||
				seriesData.find((seriesItem) => seriesItem.id.toString() === movieId);
			setActiveMovie(selectedMovie || null);
		}
	}, [searchParams, movies.length, series.length]);

	useEffect(() => {
		if (!shallowEqual(moviesData, movies)) {
			setMoviesData(movies);
		}
		if (!shallowEqual(seriesData, series)) {
			setSeriesData(series);
		}
	}, [movies, series]);

	useEffect(() => {
		const query = searchParams.get("search");
		if (query) {
			searchMovies(query);
			setMoviesData(results);
			setShowSimpleList(true);
		} else {
			setMoviesData(movies);
			setSeriesData(series);
			setShowSimpleList(simpleList);
		}
	}, [searchParams, results, showSimpleList]);

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

	if (showSimpleList) {
		return (
			<>
				<ul className={styles.simpleList}>
					{moviesData.map(
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
				const hasEnoughMovies = combinedCategory[genreId].movies.length >= 8;
				const hasEnoughSeries = combinedCategory[genreId].series.length >= 8;
				const moviesGenre = moviesGenres[genreId];
				const seriesGenre = seriesGenres[genreId];

				return hasEnoughMovies || hasEnoughSeries ? (
					<React.Fragment key={genreId}>
						{hasEnoughMovies && moviesGenre && (
							<div className={styles.container}>
								<h2 className={styles.title}>{moviesGenre}</h2>
								<MovieSlider
									handleMovieClick={handleMovieClick}
									movies={combinedCategory[genreId].movies}
								/>
							</div>
						)}
						{hasEnoughSeries && seriesGenre && (
							<div className={styles.container}>
								<h2 className={styles.title}>{seriesGenre}</h2>
								<MovieSlider
									handleMovieClick={handleMovieClick}
									movies={combinedCategory[genreId].series}
								/>
							</div>
						)}
					</React.Fragment>
				) : null;
			})}
			{activeMovie && <Modal movie={activeMovie} onClose={handleCloseModal} />}
		</>
	);
}

/* 
movies/series = [
  { id: 1, title: "Movie A", genre_ids: [28, 12] },
  { id: 2, title: "Movie B", genre_ids: [28, 16] },
  { id: 3, title: "Movie C", genre_ids: [35] },
  { id: 4, title: "Movie D", genre_ids: [35] },
  ...
]; 

groupedMovies = {
  "28": [
    { id: 1, title: "Movie A", genre_ids: [28, 12] },
    { id: 2, title: "Movie B", genre_ids: [28, 16] }
  ],
  "35": [
    { id: 3, title: "Movie C", genre_ids: [35] },
    { id: 4, title: "Movie D", genre_ids: [35] }
  ]
  ...
}; 

groupedSeries = {
  "28": [
    { id: 1, title: "Series A", genre_ids: [28, 12] },
    { id: 2, title: "Series B", genre_ids: [28, 16] }
  ],
  "35": [
    { id: 3, title: "Series C", genre_ids: [35] },
    { id: 4, title: "Series D", genre_ids: [35] }
  ],
  ...
};

combinedGroups = {
  "28": {
    movies: [
      { id: 1, title: "Movie A", genre_ids: [28, 12] },
      { id: 2, title: "Movie B", genre_ids: [28, 16] }
    ],
    series: [
      { id: 1, title: "Series A", genre_ids: [28, 12] },
      { id: 2, title: "Series B", genre_ids: [28, 16] }
    ]
  },
  "35": {
    movies: [
      { id: 3, title: "Movie C", genre_ids: [35] },
      { id: 4, title: "Movie D", genre_ids: [35] }
    ],
    series: [
      { id: 3, title: "Series C", genre_ids: [35] },
      { id: 4, title: "Series D", genre_ids: [35] }
    ]
  },
  ...
}

*/
