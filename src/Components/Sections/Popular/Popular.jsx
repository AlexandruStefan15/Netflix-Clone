import React, { useState, useEffect } from "react";
import { useFetchCategory } from "../../../hooks/useFetchCategory";
import { movieGenres } from "../../../Data/movieGenres";
import styles from "./Popular.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

import MovieList from "../../MovieList/MovieList";

export default function Popular() {
	const startPage = 1;
	const totalPages = 5;
	const { data, error } = useFetchCategory("upcoming", startPage, totalPages);

	if (error) console.error(error);

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<MovieList movies={data} simpleList={true} />
			</div>
		</section>
	);
}

/* mappedGenres = {
	28: "Filme de actiune",
	12: "Filme de aventura",
	16: "Filme anime",
  ...
};
 */
