import React from "react";
import styles from "./Browse.module.scss";
import videos from "../../Assets/videos/videos";
import { inline_svgs } from "../../Assets/svgs/svgs";
import { useRef, useState, useEffect } from "react";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import HeroBanner from "../../Components/Sections/HeroBanner/HeroBanner";
import Subtitle from "../../Components/Subtitle/Subtitle";
import Link from "../../Components/Link/Link";
import Button from "../../Components/Button/Button";

export default function Browse() {
	return (
		<div className={styles.page}>
			<Header className={styles.header} navbarProps={{ className: styles.navbar }} />
			<HeroBanner
				image="https://image.tmdb.org/t/p/original/yNlCFXqMzzGegSJ9LGhx9JoJ9Ns.jpg"
				video={videos.inception}
				movieTitleImage="https://occ-0-3467-3466.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABQxQ3b7SkJJIxy_ffd_6iLgos9_XbVbGY-q9n3PtcntXJiNutOoqs9q8SfNGUUOCjFXItEzJfZuFo9bhTL1G0WgcBdhTefcyaixWeoQqZYUq.webp?r=c62"
				subtitle="Pentru a salva clubul de noapte al părinților ei, o dansatoare de pe Broadway montează
						un varieteu exclusiv masculin, cu tematică de Crăciun, apoi cunoaște un tip versat."
				movieLinks={true}
				className={styles.heroBanner}
				variant="2"
			/>
			<Footer style={{ background: "inherit" }} />
		</div>
	);
}
