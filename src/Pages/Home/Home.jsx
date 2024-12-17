import React from "react";

import Header from "../../Components/Header/Header";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";
import StoryPanel from "../../Components/Sections/StoryPanel/StoryPanel";
import StoryPanel2 from "../../Components/Sections/StoryPanel2/StoryPanel2";
import StoryPanel3 from "../../Components/Sections/StoryPanel3/StoryPanel3";
import StoryPanel4 from "../../Components/Sections/StoryPanel4/StoryPanel4";
import Faq from "../../Components/Sections/Faq/Faq";
import Footer from "../../Components/Footer/Footer";
import Input from "../../Components/FormInput/FormInput";

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
