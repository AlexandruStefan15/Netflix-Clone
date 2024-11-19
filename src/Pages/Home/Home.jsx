import React from "react";
import styles from "./Home.module.scss";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";
import Faq from "../../Components/Sections/Faq/Faq";
import StoryPanel from "../../Components/Sections/StoryPanel/StoryPanel";
import StoryPanel2 from "../../Components/Sections/StoryPanel2/StoryPanel2";
import StoryPanel3 from "../../Components/Sections/StoryPanel3/StoryPanel3";
import StoryPanel4 from "../../Components/Sections/StoryPanel4/StoryPanel4";

export default function Home() {
  return (
    <>
      <Header />
      <HeroBanner />
      <StoryPanel />
      <StoryPanel2 />
      <StoryPanel3 />
      <StoryPanel4 />
      <Faq />
      <Footer />
    </>
  );
}
