import React from "react";
import images from "../../../Assets/images/images";
import { useTranslation } from "react-i18next";

import { Section, Container, TextBox, ImageBox, Image } from "./styles";
import Title from "../../Title/Title";
import Subtitle from "../../Subtitle/Subtitle";
import MovieMinicard from "../../MovieMinicard/MovieMinicard";

export default function StoryPanel2(props) {
	const { t, i18n } = useTranslation();

	return (
		<Section {...props}>
			<Container>
				<TextBox>
					<Title>{t("StoryPanel2.title")}</Title>
					<Subtitle>{t("StoryPanel2.subtitle")}</Subtitle>
				</TextBox>
				<ImageBox>
					<Image src={images.mobile1} alt="a mobile display" />
					<MovieMinicard />
				</ImageBox>
			</Container>
		</Section>
	);
}
