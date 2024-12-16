import React from "react";
import styles from "./styles.module.scss";
import { useState, useRef, forwardRef, useEffect, createContext, useContext } from "react";
import { useTranslation } from "react-i18next";

export default function FormInput({
	className = "",
	label = "FormInput.label",
	children,
	required = true,
	variant = "", // style variant,
	value,
	onChange,
	...props
}) {
	const { t, i18n } = useTranslation();
	const labelEl = useRef();
	const [inputIsActive, setInputIsActive] = useState(false);

	useEffect(() => {
		if (inputIsActive == true) labelEl.current.classList.add(styles.active);
		else labelEl.current.classList.remove(styles.active);
	}, [inputIsActive]);

	useEffect(() => {
		if (value) setInputIsActive(true);
	}, [value]);

	function handleBlur(e) {
		if (e.target.value == "") setInputIsActive((prev) => !prev);
	}

	return (
		<div className={styles[`wrapper${variant}`] + ` ${className}`}>
			<label className={styles.label} htmlFor={props.id} ref={labelEl}>
				{t(label)}
			</label>
			<input
				value={value}
				onChange={onChange}
				onFocus={() => setInputIsActive(true)}
				onBlur={handleBlur}
				className={styles.input}
				required={required}
				{...props}
			/>
		</div>
	);
}
