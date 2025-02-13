import React, { useEffect } from "react";

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
	useEffect(() => {
		document.body.style.backgroundColor = "black";

		return () => {
			document.body.style.backgroundColor = "";
		};
	}, []);

	return (
		<>
			<Header />
			<HeroBanner
				title="HeroBanner.set1.title"
				subtitle="HeroBanner.set1.subtitle"
				showRegisterForm={true}
			/>
			<StoryPanel />
			<StoryPanel2 />
			<StoryPanel3 />
			<StoryPanel4 />
			<Faq />
			<Footer />
		</>
	);
}
