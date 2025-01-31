import React, { useState, useEffect } from "react";
import styles from "./MovieList.module.scss";
import MovieSlider from "../MovieSlider/MovieSlider";
import { useSearchParams } from "react-router-dom";

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

	const groupedMovies = groupByGenre(movies);
	const groupedSeries = groupByGenre(series);
	const combinedCategory = combineGroups(groupedMovies, groupedSeries);

	useEffect(() => {
		const movieId = searchParams.get("mid");
		if (movieId) {
			const selectedMovie =
				movies.find((movie) => movie.id.toString() === movieId) ||
				series.find((seriesItem) => seriesItem.id.toString() === movieId);
			setActiveMovie(selectedMovie || null);
		}
	}, [searchParams, movies.length, series.length]);

	const handleMovieClick = (movie) => {
		setActiveMovie(movie);
		setSearchParams({ mid: movie.id });
	};

	const handleCloseModal = () => {
		setActiveMovie(null);
		setSearchParams({});
	};

	if (simpleList) {
		return (
			<>
				<ul className={styles.simpleList}>
					{movies.map(
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
				const movieTitle = moviesGenres[genreId];
				const tvTitle = seriesGenres[genreId];

				return hasEnoughMovies || hasEnoughSeries ? (
					<React.Fragment key={genreId}>
						{hasEnoughMovies && movieTitle && (
							<div className={styles.container}>
								<h2 className={styles.title}>{movieTitle}</h2>
								<MovieSlider
									handleMovieClick={handleMovieClick}
									movies={combinedCategory[genreId].movies}
								/>
							</div>
						)}
						{hasEnoughSeries && tvTitle && (
							<div className={styles.container}>
								<h2 className={styles.title}>{tvTitle}</h2>
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
