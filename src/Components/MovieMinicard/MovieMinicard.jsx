import React from "react";
import gifs from "../../Assets/gifs/gifs";
import images from "../../Assets/images/images";
import { useTranslation } from "react-i18next";
import styles from "./MovieMinicard.module.scss";

const movieData = {
	title: "MovieMinicard.set1.title",
	subtitle: "MovieMinicard.set1.subtitle",
	img: images.boxshot,
};

export default function MovieMinicard({
	movie = movieData,
	icon_path = gifs.downloadIcon,
	className = "",
	children,
	...props
}) {
	const { t, i18n } = useTranslation();

	if (React.Children.count(children) > 0)
		return (
			<div className={styles.container + ` ${className}`} {...props}>
				{children}
			</div>
		);

	return (
		<div className={styles.container + ` ${className}`}>
			<MovieMinicard.ImageBox>
				<MovieMinicard.Image src={movie.img} alt="movie mini poster" />
			</MovieMinicard.ImageBox>
			<MovieMinicard.TextBox>
				<MovieMinicard.Title>{t(movie.title)}</MovieMinicard.Title>
				<MovieMinicard.Subtitle>{t(movie.subtitle)}</MovieMinicard.Subtitle>
			</MovieMinicard.TextBox>
			<MovieMinicard.IconBox>
				<MovieMinicard.Image src={icon_path} alt="loading animation" />
			</MovieMinicard.IconBox>
		</div>
	);
}

MovieMinicard.ImageBox = function MovieMinicard_ImageBox({ className = "", children, ...props }) {
	return (
		<div className={styles.imageBox + ` ${className}`} {...props}>
			{children}
		</div>
	);
};

MovieMinicard.TextBox = function MovieMinicard_TextBox({ className = "", children, ...props }) {
	return (
		<div className={styles.textBox + ` ${className}`} {...props}>
			{children}
		</div>
	);
};

MovieMinicard.Title = function MovieMinicard_Title({ className = "", children, ...props }) {
	return (
		<h3 className={styles.title + ` ${className}`} {...props}>
			{children}
		</h3>
	);
};

MovieMinicard.Subtitle = function MovieMinicard_Subtitle({ className = "", children, ...props }) {
	return (
		<h4 className={styles.subtitle + ` ${className}`} {...props}>
			{children}
		</h4>
	);
};

MovieMinicard.IconBox = function MovieMinicard_IconBox({ className, children, ...props }) {
	return (
		<div className={styles.iconBox + ` ${className}`} {...props}>
			{children}
		</div>
	);
};

MovieMinicard.Image = function MovieMinicard_Image({ ...props }) {
	return <img {...props} />;
};
