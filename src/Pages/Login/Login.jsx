import React, { useContext } from "react";
import styles from "./Login.module.scss";
import { EmailContext } from "../../Context/EmailContext";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Form from "../../Components/Form/Form";

export default function Login() {
	const { emailValue, setEmailValue } = useContext(EmailContext);

	return (
		<div className={styles.page}>
			<Header />
			<div className={styles.container}>
				<Form emailValue={emailValue} />
			</div>
			<Footer />
		</div>
	);
}
