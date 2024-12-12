import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { inline_svgs } from "../../../Assets/svgs/svgs";

import Accordion from "../../Accordion/Accordion";
import RegisterForm from "../../RegisterForm/RegisterForm";
import Title from "../../Title/Title";

export default function Faq({ className = "" }) {
	const { t, i18n } = useTranslation();

	return (
		<section className={styles.section + ` ${className}`}>
			<div className={styles.container}>
				<Title className={styles.title}>{t("Faq.title")}</Title>
				<Accordion />
				<RegisterForm className={styles.registerForm}>
					<RegisterForm.Title>{t("RegisterForm.set1.title")}</RegisterForm.Title>
					<RegisterForm.Group>
						<RegisterForm.FormInput required={true} id="faq-email" type="email" name="email" />
						<RegisterForm.Button type="submit">
							{t("RegisterForm.set1.buttonText")}
							<RegisterForm.Icon>{inline_svgs.right_arrow}</RegisterForm.Icon>
						</RegisterForm.Button>
					</RegisterForm.Group>
				</RegisterForm>
			</div>
		</section>
	);
}
