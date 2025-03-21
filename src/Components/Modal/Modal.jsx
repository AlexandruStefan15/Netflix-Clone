import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.scss";

import TMDbVideoPlayer from "../TmdbVideoPlayer/TmdbVideoPlayer";
import StarRating from "../StarRating/StarRating";

export default function Modal({ movie, onClose }) {
	const dialogRef = useRef(null);

	useEffect(() => {
		const dialog = dialogRef.current;

		if (movie) {
			dialog?.showModal();
		} else {
			dialog?.close();
		}

		const handleClickOutside = (e) => {
			if (e.target === dialog) {
				dialog?.close();
			}
		};

		dialog?.addEventListener("click", handleClickOutside);

		return () => {
			dialog?.removeEventListener("click", handleClickOutside);
		};
	}, [movie]);

	return (
		<dialog ref={dialogRef} className={styles.dialog} onClose={onClose}>
			<div className={styles.content}>
				<button
					onClick={() => {
						dialogRef.current?.close();
					}}
					className={styles.closeButton}
				>
					X
				</button>
				<TMDbVideoPlayer
					id={movie.id}
					type={movie.title ? "movie" : "tv"}
					image={
						movie.backdrop_path
							? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
							: `https://image.tmdb.org/t/p/original${movie.poster_path}`
					}
				/>
				<div className={styles.details}>
					<h1 className={styles.title}>{movie.title || movie.name}</h1>
					<p className={styles.overview}>{movie.overview ? movie.overview : "No description"}</p>
					<footer className={styles.footer}>
						<StarRating rating={movie.vote_average} />
						<p> {movie.release_date || movie.first_air_date}</p>
					</footer>
				</div>
			</div>
		</dialog>
	);
}
