import React, { useState, useRef, useEffect } from "react";
import styles from "./Form.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";
import { use } from "react";

export default function Form({ className = "", data, setUserEmail, children, onSubmit, ...props }) {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email_or_phone: data.userEmail,
		password: "",
	});

	function handleSubmit(event) {
		event.preventDefault();
		if (onSubmit) onSubmit(event, formData);
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	if (children)
		return (
			<form action="" className={styles.form + ` ${className}`} {...props}>
				{children}
			</form>
		);

	return (
		<form action="" className={styles.form + ` ${className}`} onSubmit={handleSubmit} {...props}>
			<Form.Title>{t("Form.set1.title")}</Form.Title>
			<Form.FormInput
				type="text"
				label="FormInput.label_3"
				name="email_or_phone"
				id="login-email-or-phone"
				pattern="^([^\s@]+@[^\s@]+\.[^\s@]+|\+?[0-9]{7,15})$"
				value={formData.email_or_phone}
				onChange={(e) => {
					const value = e.target.value;
					setFormData({ ...formData, email_or_phone: value });
					setUserEmail(value);
				}}
			/>
			<Form.FormInput
				type="password"
				label="FormInput.label_2"
				name="password"
				id="login-password"
				value={formData.password}
				onChange={handleChange}
			/>
			<Form.Button type="submit">{t("Form.set1.buttonText")}</Form.Button>
			<div className={styles.rememberMe_container}>
				<Form.RememberMe />
				<Form.NavLink>{t("Form.set1.need_help")}</Form.NavLink>
			</div>
			<Form.Footer>
				<div className={styles.signUp_container}>
					<Form.Text>{t("Form.set1.new_to_netflix")}</Form.Text>
					<Form.NavLink>{t("Form.set1.sign_up")}</Form.NavLink>
				</div>
				<Form.Recaptcha />
			</Form.Footer>
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
	const inputRef = useRef(null);

	useEffect(() => {
		const input = inputRef.current;
		if (!input) return;

		console.log(input);
	}, []);

	return (
		<FormInput
			ref={inputRef}
			variant={variant}
			className={styles.formInput + ` ${className}`}
			{...props}
		>
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

Form.NavLink = function Form_NavLink({ className = "", children, href = "#", ...props }) {
	return (
		<NavLink className={styles.navLink + ` ${className}`} to={href} {...props}>
			{children}
		</NavLink>
	);
};

Form.Button = function Form_Button({ className = "", children, ...props }) {
	return (
		<Button className={styles.button + ` ${className}`} {...props}>
			{children}
		</Button>
	);
};

Form.RememberMe = function Form_RememberMe({ className = "", children, ...props }) {
	const { t } = useTranslation();
	const [isChecked, setIsChecked] = useState(false);

	function handleClick() {
		setIsChecked(!isChecked);
	}

	return (
		<div className={styles.rememberMe + ` ${className}`} {...props}>
			{children || (
				<>
					<input
						onClick={handleClick}
						name={props.name}
						id={props.id}
						type="checkbox"
						checked={isChecked}
					/>
					<label onClick={handleClick} htmlFor={props.name}>
						{t("Form.set1.remember_me")}
					</label>
				</>
			)}
		</div>
	);
};

Form.Recaptcha = function Form_Recaptcha({ className = "", children, ...props }) {
	const { t, i18n } = useTranslation();

	return (
		<div className={styles.recaptcha + ` ${className}`} {...props}>
			{children || (
				<>
					<Form.Text>
						{t("Form.set1.recaptcha")} <Form.NavLink>{t("Form.set1.learn_more")}</Form.NavLink>
					</Form.Text>
				</>
			)}
		</div>
	);
};
