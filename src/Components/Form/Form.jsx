import React from "react";
import styles from "./Form.module.scss";
import { useTranslation } from "react-i18next";

import Link from "../Link/Link";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";

export default function Form({ className = "", children, ...props }) {
	const { t, i18n } = useTranslation();

	return (
		<form action="" className={styles.form + ` ${className}`} {...props}>
			<Form.Title>Sign In</Form.Title>
			<Form.FormInput
				type="text"
				label="FormInput.label_3"
				name="email-or-phone"
				id="login-email-or-phone"
				pattern="^([^\s@]+@[^\s@]+\.[^\s@]+|\+?[0-9]{7,15})$"
			/>
			<Form.FormInput
				type="password"
				label="FormInput.label_2"
				name="password"
				id="login-password"
			/>
			<Button className={styles.button} type="submit">
				Contectare
			</Button>
		</form>
	);
}

Form.Title = function Form_Title({ className = "", children, ...props }) {
	return (
		<h1 className={styles.title + ` ${className}`} {...props}>
			{children}
		</h1>
	);
};

Form.Group = function Form_Group({ className = "", children, ...props }) {
	return (
		<div className={styles.group + ` ${className}`} {...props}>
			{children}
		</div>
	);
};

Form.FormInput = function Form_FormInput({ className = "", children, variant = "2", ...props }) {
	return (
		<FormInput variant={variant} className={styles.formInput + ` ${className}`} {...props}>
			{children}
		</FormInput>
	);
};

Form.Footer = function Form_Footer({ className = "", children, ...props }) {
	return (
		<div className={styles.footer + ` ${className}`} {...props}>
			{children}
		</div>
	);
};

Form.Text = function Form_Text({ className = "", children, ...props }) {
	return (
		<p className={styles.text + ` ${className}`} {...props}>
			{children}
		</p>
	);
};

Form.Link = function Form_Link({ className = "", children, ...props }) {
	return (
		<Link className={styles.link + ` ${className}`} {...props}>
			{children}
		</Link>
	);
};

Form.Button = function Form_Button({ className = "", children, ...props }) {
	return (
		<Button className={styles.button + ` ${className}`} {...props}>
			{children}
		</Button>
	);
};
