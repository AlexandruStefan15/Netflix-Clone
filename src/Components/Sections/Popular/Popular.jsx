import React from "react";
import { useFetchCategory } from "../../../hooks/useFetchCategory";
import styles from "./Popular.module.scss";

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
