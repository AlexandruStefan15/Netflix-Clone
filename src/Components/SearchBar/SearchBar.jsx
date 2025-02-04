import React, { useState, useRef } from "react";
import styles from "./SearchBar.module.scss";
import { inline_svgs } from "../../Assets/svgs/svgs";

const SearchBar = ({ placeholder = "Cauta...", onSearch, className = "", ...props }) => {
	const [query, setQuery] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef(null);

	const handleChange = (e) => {
		const value = e.target.value;
		setQuery(value);
		if (onSearch) onSearch(value); // Call parent function if provided
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (onSearch) onSearch(query); // Trigger search on submit
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input
				type="text"
				value={query}
				ref={inputRef}
				onChange={handleChange}
				placeholder={placeholder}
				onBlur={(e) => {
					if (e.target.value === "") setIsFocused(false);
				}}
				className={`${styles.input} ${isFocused ? styles.active : ""} ${className}`}
			/>
			<button
				type="button"
				className={styles.button}
				onClick={(e) => {
					e.preventDefault();
					setIsFocused(true);
					setTimeout(() => {
						inputRef.current.focus();
					}, 0);
				}}
			>
				<div className={styles.icon}>{inline_svgs.search}</div>
			</button>
		</form>
	);
};

export default SearchBar;
