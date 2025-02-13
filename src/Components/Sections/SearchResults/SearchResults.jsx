import React, { useEffect } from "react";
import styles from "./SearchResults.module.scss";
import { useSearchParams } from "react-router-dom";
import { useMovieSearch } from "../../../hooks/useMovieSearch";
import { useNavigate } from "react-router-dom";

import MovieList from "../../MovieList/MovieList";

export default function SearchResults() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	useEffect(() => {
		const query = searchParams.get("q");
		if (!query) {
			navigate(-1, { replace: true });
		}
	}, [searchParams]);

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<MovieList simpleList={true} />
			</div>
		</section>
	);
}
