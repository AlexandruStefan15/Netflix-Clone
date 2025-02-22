import React from "react";
import images from "../../../Assets/images/images";
import { useTranslation } from "react-i18next";
import { inline_svgs } from "../../../Assets/svgs/svgs";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import usePauseOnTabChange from "../../../hooks/usePauseOnTabChange";
import { isSmartTV } from "../../../utils/helpers";

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
	movieLogo,
	movieLinks,
	showRegisterForm,
	shouldTranslate = true,
	...props
}) {
	const { t, i18n } = useTranslation();
	const isTV = isSmartTV();
	const [transitionIsActive, setTransitionIsActive] = useState(false);
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [currentImage, setCurrentImage] = useState(image);
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);
	const [currentVideo, setCurrentVideo] = useState(video);

	const videoRef = useRef(null);
	const subtitleRef = useRef(null);
	const movieLogoRef = useRef(null);
	const imageRef = useRef(null);

	usePauseOnTabChange(videoRef, video);

	useEffect(() => {
		setCurrentImage(image);
		return () => setIsImageLoaded(false);
	}, [image]);

	useEffect(() => {
		setCurrentVideo(video);
		return () => setIsVideoLoaded(false);
	}, [video]);

	useEffect(() => {
		/* if (imageRef.current) {
			imageRef.current.classList.remove(styles.hidden);
		} */
		const timer = setTimeout(() => {
			if (videoRef.current && imageRef.current && isImageLoaded && isVideoLoaded) {
				imageRef.current.classList.add(styles.hidden);
				videoRef.current.play();
				videoRef.current.muted = false;
			}
		}, 1550);

		return () => clearTimeout(timer);
	}, [isImageLoaded, isVideoLoaded]);

	useEffect(() => {
		if (movieLogoRef.current && subtitleRef.current && isImageLoaded && isVideoLoaded) {
			const height = subtitleRef.current.offsetHeight;
			movieLogoRef.current.style.setProperty("--subtitle-height", `${height}px`);

			const timer = setTimeout(() => {
				setTransitionIsActive(true);
			}, 6000);

			return () => {
				clearTimeout(timer);
				setTransitionIsActive(false);
			};
		}
	}, [isImageLoaded, isVideoLoaded]);

	useEffect(() => {
		if (transitionIsActive == "reset") {
			movieLogoRef.current?.classList.add(styles.visible);
			subtitleRef.current?.classList.add(styles.visible);
		}
	}, [transitionIsActive]);

	return (
		<section
			className={styles[`section${variant}`] + (isTV ? ` ${styles.isTV}` : "") + ` ${className}`}
			{...props}
		>
			<div className={styles.container}>
				{title && <Title className={styles.title}>{t(title)}</Title>}
				{movieLogo && (
					<div
						className={
							styles.movieLogo + ` ${transitionIsActive ? styles.hidden : styles.stopTransition}`
						}
						ref={movieLogoRef}
					>
						<img
							onLoad={(e) => {
								const img = e.target;
								const zoom = window.devicePixelRatio;

								if (zoom > 1 && img.offsetHeight > 350) img.style.width = `500px`;
								else img.style.width = `${img.naturalWidth}px`;
							}}
							src={movieLogo}
							alt=""
						/>
					</div>
				)}
				{subtitle && (
					<Subtitle
						className={
							styles.subtitle + ` ${transitionIsActive ? styles.hidden : styles.stopTransition}`
						}
						variant={variant}
						ref={subtitleRef}
					>
						{shouldTranslate ? t(subtitle) : subtitle}
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
						<Link to={0} data-variant="2">
							<div className={styles.icon}>{inline_svgs.exclamation_mark}</div>
							<span className={styles.text}>Mai multe informatii</span>
						</Link>
					</div>
				)}
			</div>
			{currentImage && (
				<div ref={imageRef} className={styles.image}>
					<img
						src={currentImage} // This is a hack to force the image to reload
						alt="hero-banner-image"
						onLoad={() => setIsImageLoaded(true)}
						/* style={video && { visibility: isImageLoaded ? "visible" : "hidden" }} */
					/>
				</div>
			)}
			{currentVideo && (
				<div className={styles.video}>
					<video
						onEnded={() => {
							setTransitionIsActive("reset");
							imageRef.current.classList.remove(styles.hidden);
						}}
						onLoadedData={() => setIsVideoLoaded(true)}
						style={{ visibility: isVideoLoaded ? "visible" : "hidden" }}
						ref={videoRef}
						src={currentVideo}
						muted={true}
						playsInline
						preload="metadata"
					></video>
				</div>
			)}
		</section>
	);
}
