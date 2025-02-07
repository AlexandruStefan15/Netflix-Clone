import React, { useState, useRef, useEffect } from "react";
import styles from "./SearchBar.module.scss";
import { inline_svgs } from "../../Assets/svgs/svgs";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SearchBar = ({ placeholder = "Cauta...", onSearch, className = "", ...props }) => {
	const [query, setQuery] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef(null);
	const location = useLocation();

	const handleChange = (e) => {
		const value = e.target.value;
		setQuery(value);
		if (onSearch) onSearch(value);
		else {
			if (e.target.value === "") setSearchParams({});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (onSearch) onSearch(query);
		else {
			setSearchParams({ search: query });
		}
	};

	useEffect(() => {
		if (!searchParams.get("search")) {
			setQuery("");
			setIsFocused(false);
		}
	}, [location]);

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
