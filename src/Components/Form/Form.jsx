import React from "react";
import styles from "./Form.module.scss";

import Link from "../Link/Link";
import FormInput from "../FormInput/FormInput";

export default function Form({ className = "", children, ...props }) {
	return (
		<form action="" className={styles.form + ` ${className}`} {...props}>
			<Form.Title>Sign In</Form.Title>
			<Form.FormInput>
				<FormInput.Label>Email or phone number</FormInput.Label>
				<FormInput.Input />
			</Form.FormInput>
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

Form.FormInput = function Form_FormInput({ className = "", children, sv = "2", ...props }) {
	return (
		<FormInput sv={sv} className={styles.formInput + ` ${className}`} {...props}>
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
