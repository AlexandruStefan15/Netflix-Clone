import React from "react";
import styles from "./styles.module.scss";
import { useState, useRef, forwardRef, useEffect, createContext, useContext } from "react";
import { useTranslation } from "react-i18next";

const FormInputContext = createContext({});

export default function FormInput({
	className = "",
	label = "FormInput.label",
	value = "",
	children,
	required = true,
	sv = "", // style variant
	...props
}) {
	const { t, i18n } = useTranslation();
	const [inputValue, setInputValue] = useState(value);
	const [isActive, setIsActive] = useState(false);

	if (React.Children.count(children) > 0)
		return (
			<FormInputContext.Provider value={{ inputValue, isActive, setIsActive, setInputValue }}>
				<div className={styles[`wrapper${sv}`] + ` ${className}`} {...props}>
					{children}
				</div>
			</FormInputContext.Provider>
		);

	return (
		<FormInputContext.Provider value={{ inputValue, isActive, setIsActive, setInputValue }}>
			<div className={styles[`wrapper${sv}`] + ` ${className}`}>
				<FormInput.Label htmlFor={props.id}>{t(label)}</FormInput.Label>
				<FormInput.Input
					required={required}
					type={props.type}
					id={props.id}
					name={props.name}
					{...props}
				/>
			</div>
		</FormInputContext.Provider>
	);
}

FormInput.Label = function FormInput_Label({ className = "", children, ...props }) {
	const { isActive } = useContext(FormInputContext);
	const labelEl = useRef();

	useEffect(() => {
		if (isActive == true) labelEl.current.classList.add(styles.active);
		else labelEl.current.classList.remove(styles.active);
	}, [isActive]);

	return (
		<label className={styles.label + ` ${className}`} ref={labelEl} {...props}>
			{children}
		</label>
	);
};

FormInput.Input = function FormInput_Input({ className = "", children, ...props }) {
	const { inputValue, setIsActive, setInputValue } = useContext(FormInputContext);

	function handleBlur(e) {
		if (e.target.value == "") setIsActive((current) => !current);
	}

	return (
		<input
			onChange={(e) => setInputValue(e.target.value)}
			onFocus={() => setIsActive(true)}
			onBlur={handleBlur}
			className={styles.input + ` ${className}`}
			value={inputValue}
			{...props}
		/>
	);
};
