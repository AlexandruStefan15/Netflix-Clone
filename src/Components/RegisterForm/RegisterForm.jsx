import React, { createContext, useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useTranslation } from "react-i18next";
import { inline_svgs } from "../../Assets/svgs/svgs";
import styles from "./styles.module.scss";

import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";

const FormContext = createContext();

export default function RegisterForm({
	className = "",
	children,
	title = "RegisterForm.v1.title",
	buttonText = "RegisterForm.v1.buttonText",
	inputProps,
	...props
}) {
	const { t, i18n } = useTranslation();

	const [inputValue, setInputValue] = useState("");
	const { setUserEmail } = useContext(UserContext);

	if (children)
		return (
			<FormContext.Provider value={{ inputValue, setInputValue, setUserEmail }}>
				<form action="" className={styles.form + ` ${className}`} {...props}>
					{children}
				</form>
			</FormContext.Provider>
		);

	return (
		<form action="" className={styles.form + ` ${className}`}>
			<RegisterForm.Title>{t(title)}</RegisterForm.Title>
			<RegisterForm.Group>
				<RegisterForm.FormInput
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
						setUserEmail(e.target.value);
					}}
				/>
				<RegisterForm.Button type="submit">
					{t(buttonText)}
					<RegisterForm.Icon>{inline_svgs.right_arrow}</RegisterForm.Icon>
				</RegisterForm.Button>
			</RegisterForm.Group>
		</form>
	);
}

RegisterForm.Title = function RegisterForm_Title({ className = "", children, ...props }) {
	return (
		<h3 className={styles.title + ` ${className}`} {...props}>
			{children}
		</h3>
	);
};

RegisterForm.Group = function RegisterForm_Group({ className = "", children, ...props }) {
	return (
		<div className={styles.group + ` ${className}`} {...props}>
			{children}
		</div>
	);
};

RegisterForm.FormInput = function RegisterForm_FormInput({ className = "", children, ...props }) {
	const { inputValue, setInputValue, setUserEmail } = useContext(FormContext);

	return (
		<FormInput
			value={inputValue}
			onChange={(e) => {
				setInputValue(e.target.value);
				props.type == "email" && setUserEmail(e.target.value);
			}}
			className={styles.formInput + ` ${className}`}
			{...props}
		/>
	);
};

RegisterForm.Button = function RegisterForm_Button({ className = "", children, ...props }) {
	return (
		<Button className={styles.button + ` ${className}`} {...props}>
			{children}
		</Button>
	);
};

RegisterForm.Icon = function RegisterForm_Icon({ className = "", children, src, alt, ...props }) {
	if (src) return <img src={src} alt={alt} />;

	return (
		<div className={styles.icon + ` ${className}`} {...props}>
			{children}
		</div>
	);
};
