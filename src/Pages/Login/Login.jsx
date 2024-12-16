import React, { useContext } from "react";
import styles from "./Login.module.scss";
import { UserContext } from "../../Context/UserContext";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Form from "../../Components/Form/Form";

export default function Login() {
	const { userEmail, setUserEmail } = useContext(UserContext);

	return (
		<div className={styles.page}>
			<Header />
			<div className={styles.container}>
				<Form data={{ userEmail, setUserEmail }} />
			</div>
			<Footer />
		</div>
	);
}
