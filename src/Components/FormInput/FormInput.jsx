import React from "react";
import styles from "./styles.module.scss";
import { useState, useRef, forwardRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

function FormInput(
	{
		className = "",
		label = "FormInput.label",
		children,
		required = true,
		variant = "", // style variant,
		value,
		onChange,
		...props
	},
	ref
) {
	const { t, i18n } = useTranslation();
	const labelEl = useRef();
	const [inputIsActive, setInputIsActive] = useState(false);

	useEffect(() => {
		if (inputIsActive == true) labelEl.current.classList.add(styles.active);
		else labelEl.current.classList.remove(styles.active);
	}, [inputIsActive]);

	useEffect(() => {
		if (value) setInputIsActive(true);
	}, []);

	function handleBlur(e) {
		if (e.target.value == "") setInputIsActive(false);
	}

	return (
		<div className={styles[`wrapper${variant}`] + ` ${className}`}>
			<label className={styles.label} htmlFor={props.id} ref={labelEl}>
				{t(label)}
			</label>
			<input
				ref={ref}
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

export default forwardRef(FormInput);
