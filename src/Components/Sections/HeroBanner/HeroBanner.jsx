import React, { forwardRef } from "react";
import images from "../../../Assets/images/images";
import { useTranslation } from "react-i18next";
import { inline_svgs } from "../../../Assets/svgs/svgs";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState, useLayoutEffect } from "react";

import RegisterForm from "../../RegisterForm/RegisterForm";
import Subtitle from "../../Subtitle/Subtitle";
import Title from "../../Title/Title";
import Button from "../../Button/Button";
import Link from "../../Link/Link";

export default function HeroBanner({
	className = "",
	image = images.bannerPicture,
	video,
	variant = "",
	title,
	subtitle,
	movieTitleImage,
	movieLinks,
	showRegisterForm,
	...props
}) {
	const { t, i18n } = useTranslation();
	const [subtitleHeight, setSubtitleHeight] = useState(0);
	const videoRef = useRef(null);
	const subtitleRef = useRef(null);
	const movieTitleImageRef = useRef(null);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.classList.remove(styles.active);
		}

		if (movieTitleImageRef.current && subtitleRef.current) {
			const height = subtitleRef.current.offsetHeight;
			setSubtitleHeight(height);
			movieTitleImageRef.current.style.setProperty("--subtitle-height", `${height}px`);
		}

		const timer = setTimeout(() => {
			if (videoRef.current) {
				videoRef.current.load();
				videoRef.current.classList.add(styles.active);
				videoRef.current.play();
			}
		}, 1500);

		return () => clearTimeout(timer);
	}, [video]);

	return (
		<section className={styles[`section${variant}`] + ` ${className}`} {...props}>
			<div className={styles.container}>
				{title && <Title className={styles.title}>{t(title)}</Title>}
				{movieTitleImage && (
					<div className={styles.movieTitleImage} ref={movieTitleImageRef}>
						<img src={movieTitleImage} alt="" />
					</div>
				)}
				{subtitle && (
					<Subtitle className={styles.subtitle} variant={variant} ref={subtitleRef}>
						{t(subtitle)}
					</Subtitle>
				)}
				{showRegisterForm && (
					<RegisterForm className={styles.registerForm}>
						<RegisterForm.Title>{t("RegisterForm.set1.title")}</RegisterForm.Title>
						<RegisterForm.Group>
							<RegisterForm.FormInput
								required={true}
								type="email"
								name="email"
								id="hero-banner-email"
							/>
							<RegisterForm.Button type="submit">
								{t("RegisterForm.set1.buttonText")}
								<RegisterForm.Icon>{inline_svgs.right_arrow}</RegisterForm.Icon>
							</RegisterForm.Button>
						</RegisterForm.Group>
					</RegisterForm>
				)}
				{movieLinks && (
					<div className={styles.links_container}>
						<Button data-variant="2">
							<div className={styles.icon}>{inline_svgs.right_arrow_thick}</div>
							<span className={styles.text}>Redare</span>
						</Button>
						<Link data-variant="2">
							<div className={styles.icon}>{inline_svgs.exclamation_mark}</div>
							<span className={styles.text}>Mai multe informatii</span>
						</Link>
					</div>
				)}
			</div>
			{image && (
				<div className={styles.image}>
					<img src={image} alt="movies" />
				</div>
			)}
			{video && (
				<div className={styles.video}>
					<video
						onEnded={(e) => {
							e.target.classList.remove(styles.active);
							movieTitleImageRef.current.classList.add(styles.visible);
							subtitleRef.current.classList.add(styles.visible);
						}}
						ref={videoRef}
						src={video}
						muted={false}
						playsInline
					></video>
				</div>
			)}
		</section>
	);
}

/* HeroBanner.Container = function HeroBanner_Container({
	children,
	className = "",
	variant = "",
	...props
}) {
	return (
		<div className={styles[`container${variant}`] + ` ${className}`} {...props}>
			{children}
		</div>
	);
};

HeroBanner.MovieTitle = function HeroBanner_MovieTitle({ children, className = "", ...props }) {
	const movieTitleRef = useRef(null);

	useEffect(() => {
		movieTitleRef.current.style.setProperty("--subtitle-height", `${subtitleHeight}px`);
		movieTitleRef.current.classList.add(styles.shrinkAnimation);
	}, [subtitleHeight]);

	return (
		<div className={styles.movieTitle + ` ${className}`} ref={movieTitleRef} {...props}>
			{props.image && <img src={props.image} alt={props.alt} />}
			{children}
		</div>
	);
};

HeroBanner.Subtitle = function HeroBanner_Subtitle({ children, className = "", ...props }) {
	const subtitleRef = useRef(null);

	useEffect(() => {
		const height = subtitleRef.current.offsetHeight;
		setSubtitleHeight(height);
	}, []);

	return (
		<Subtitle className={styles.subtitle} ref={subtitleRef} variant="2" {...props}>
			{children}
		</Subtitle>
	);
}; */
