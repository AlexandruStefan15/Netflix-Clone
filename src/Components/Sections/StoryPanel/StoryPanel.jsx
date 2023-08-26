import React from "react";
import videos from "../../../Assets/videos/videos";
import images from "../../../Assets/images/images";
import { useTranslation } from "react-i18next";

import { Section, Container, TextBox, ImageBox, Video, Image } from "./styles";
import Title from "../../Title/Title";
import Subtitle from "../../Subtitle/Subtitle";

export default function StoryPanel(props) {
  const { t, i18n } = useTranslation();

  return (
    <Section {...props}>
      <Container>
        <TextBox>
          <Title>{t("StoryPanel.title")}</Title>
          <Subtitle>{t("StoryPanel.subtitle")}</Subtitle>
        </TextBox>
        <ImageBox>
          <Image src={images.tv} alt="a tv with blank screen" />
          <Video src={videos.videoStory1} />
        </ImageBox>
      </Container>
    </Section>
  );
}
