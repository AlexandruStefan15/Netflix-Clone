import React from "react";
import styles from "./Login.module.scss";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Form from "../../Components/Form/Form";

export default function Login() {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <Form />
      </div>
      <Footer />
    </div>
  );
}
