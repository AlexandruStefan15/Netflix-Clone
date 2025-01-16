import React from "react";
import styles from "./MovieList.module.scss";
import MovieSlider from "../MovieSlider/MovieSlider";

const groupByGenre = (items) =>
	items.reduce((acc, item) => {
		if (!item.genre_ids) return acc;
		item.genre_ids.forEach((genre) => {
			acc[genre] = acc[genre] || [];
			acc[genre].push(item);
		});
		return acc;
	}, {});

const combineGroups = (groupedMovies, groupedSeries) => {
	let combinedGroups = {};
	const genreIds = new Set([...Object.keys(groupedMovies), ...Object.keys(groupedSeries)]);

	genreIds.forEach((genreId) => {
		combinedGroups[genreId] = {
			movies: groupedMovies[genreId] || [],
			series: groupedSeries[genreId] || [],
		};
	});

	return combinedGroups;
};

const renderGroupedItems = (groupedItems = {}, genres = [], types = []) =>
	Object.keys(groupedItems)
		.filter(
			(genreId) =>
				groupedItems[genreId].movies.length >= 7 && groupedItems[genreId].series.length >= 7
		)
		.map((genreId) => (
			<React.Fragment key={genreId}>
				<div className={styles.container}>
					<h2 className={styles.title}>{genres[0][genreId]}</h2>
					<MovieSlider movies={groupedItems[genreId][types[0]]} />
				</div>
				<div className={styles.container}>
					<h2 className={styles.title}>{genres[1][genreId]}</h2>
					<MovieSlider movies={groupedItems[genreId][types[1]]} />
				</div>
			</React.Fragment>
		));

export default function MovieList({
	movies = [],
	series = [],
	moviesGenres = {},
	seriesGenres = {},
}) {
	const groupedMovies = groupByGenre(movies);
	const groupedSeries = groupByGenre(series);
	const combinedGroups = combineGroups(groupedMovies, groupedSeries);

	return (
		<>{renderGroupedItems(combinedGroups, [moviesGenres, seriesGenres], ["movies", "series"])}</>
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
