import React, { useState } from "react";
import styles from "./SearchBar.module.scss";
import { inline_svgs } from "../../Assets/svgs/svgs";

const SearchBar = ({ placeholder = "Search...", onSearch, className = "" }) => {
	const [query, setQuery] = useState("");

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
				onChange={handleChange}
				placeholder={placeholder}
				className={styles.input + ` ${className}`}
			/>
			<button type="submit" className={styles.button}>
				<div className={styles.icon}>{inline_svgs.search}</div>
			</button>
		</form>
	);
};

export default SearchBar;
