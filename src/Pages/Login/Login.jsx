import React, { useContext } from "react";
import styles from "./Login.module.scss";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Form from "../../Components/Form/Form";
import TmdbVideoPlayer from "../../Components/TmdbVideoPlayer/TmdbVideoPlayer";

export default function Login() {
	const { userEmail, setUserEmail } = useContext(UserContext);
	const navigate = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();
		navigate("/browse");
	}

	return (
		<div className={styles.wrapper}>
			<Header />
			<div className={styles.container}>
				<Form data={{ userEmail }} setUserEmail={setUserEmail} onSubmit={handleSubmit} />
			</div>
			<Footer />
		</div>
	);
}
