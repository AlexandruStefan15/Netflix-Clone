import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.scss";

export default function Modal({ movie, onClose }) {
	const dialogRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (e.target === dialogRef.current) {
				dialogRef.current?.close();
			}
		};

		const dialog = dialogRef.current;
		dialog?.addEventListener("click", handleClickOutside);

		return () => {
			dialog?.removeEventListener("click", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (movie) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [movie]);

	if (!movie)
		return (
			<p style={{ color: "red" }}>
				Error: the modal has no movie data to display, be sure to pass a movie.
			</p>
		);

	console.log(movie);

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
				{/* trailer */}
				<div className={styles.image}>
					<img
						src={
							movie.backdrop_path
								? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
								: `https://image.tmdb.org/t/p/original${movie.poster_path}`
						}
						alt={`${movie.title} backdrop`}
					/>
				</div>
				<div className={styles.details}>
					<h1>{movie.title}</h1>
					<p>{movie.overview}</p>
					<p>{movie.release_date}</p>
				</div>
			</div>
		</dialog>
	);
}
