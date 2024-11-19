import React from "react";
import images from "../../../Assets/images/images";
import videos from "../../../Assets/videos/videos";
import { useTranslation } from "react-i18next";

import { Section, Container, TextBox, ImageBox, Video, Image } from "./styles";
import Title from "../../Title/Title";
import Subtitle from "../../Subtitle/Subtitle";

export default function StoryPanel3(props) {

  const { t, i18n } = useTranslation();

  return (
    <Section {...props}>
      <Container>
        <TextBox>
          <Title>{t('StoryPanel3.title')}</Title>
          <Subtitle>{t('StoryPanel3.subtitle')}</Subtitle>
        </TextBox>
        <ImageBox>
          <Image src={images.tv2} alt="a desktop display" />
          <Video src={videos.strangerThingsGuys} />
        </ImageBox>
      </Container>
    </Section>
  );
}
