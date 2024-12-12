import React from "react";
import images from "../../../Assets/images/images";
import { useTranslation } from "react-i18next";

import { Section, Container, ImageBox, TextBox, Image } from "./styles";
import Title from "../../Title/Title";
import Subtitle from "../../Subtitle/Subtitle";

export default function StoryPanel4(props) {
	const { t, i18n } = useTranslation();

	return (
		<Section {...props}>
			<Container>
				<TextBox>
					<Title>{t("StoryPanel4.title")}</Title>
					<Subtitle>{t("StoryPanel4.subtitle")}</Subtitle>
				</TextBox>
				<ImageBox>
					<Image src={images.kids} alt="kids with a rabbit" />
				</ImageBox>
			</Container>
		</Section>
	);
}
