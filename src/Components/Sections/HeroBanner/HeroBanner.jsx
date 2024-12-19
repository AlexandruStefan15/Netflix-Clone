import React from "react";
import images from "../../../Assets/images/images";
import { useTranslation } from "react-i18next";
import { inline_svgs } from "../../../Assets/svgs/svgs";
import styles from "./styles.module.scss";

import RegisterForm from "../../RegisterForm/RegisterForm";
import Subtitle from "../../Subtitle/Subtitle";
import Title from "../../Title/Title";

export default function HeroBanner({ className = "", children, ...props }) {
	const { t, i18n } = useTranslation();

	if (children)
		return (
			<section className={styles.section + ` ${className}`} {...props}>
				{children}
			</section>
		);

	return (
		<section className={styles.section + ` ${className}`} {...props}>
			<div className={styles.container}>
				<Title className={styles.title}>{t("HeroBanner.set1.title")}</Title>
				<Subtitle className={styles.subtitle}>{t("HeroBanner.set1.subtitle")}</Subtitle>
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
			</div>
			<div className={styles.image}>
				<img src={images.bannerPicture} alt="movies" />
			</div>
		</section>
	);
}
