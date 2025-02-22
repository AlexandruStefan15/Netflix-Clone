import React from "react";
import styles from "./StarRating.module.scss";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating, className = "", title = "Rating:" }) => {
	const maxStars = 5;
	const normalizedRating = (rating / 10) * maxStars;
	const stars = [];

	for (let i = 1; i <= maxStars; i++) {
		if (i <= normalizedRating) {
			stars.push(<FaStar key={i} className={styles.star} />);
		} else if (i - 0.5 === normalizedRating) {
			stars.push(<FaStarHalfAlt key={i} className={styles.star} />);
		} else {
			stars.push(<FaRegStar key={i} className={styles.star} />);
		}
	}

	return (
		<div className={styles.rating + ` ${className}`}>
			{title && <span className={styles.title}>{title}</span>}
			{stars}
		</div>
	);
};

export default StarRating;
