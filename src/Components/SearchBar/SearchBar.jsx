import React, { useState, useRef, useEffect } from "react";
import styles from "./SearchBar.module.scss";
import { inline_svgs } from "../../Assets/svgs/svgs";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

import { useIsMobile } from "../../hooks/useIsMobile";

const SearchBar = ({ placeholder = "Cauta...", onSearch, className = "", ...props }) => {
	const [query, setQuery] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef(null);
	const location = useLocation();
	const navigate = useNavigate();
	const isMobile = useIsMobile();

	const handleChange = (e) => {
		const value = e.target.value;
		setQuery(value);
		if (e.target.value === "" && (isMobile || location.pathname !== "/browse/search")) {
			setIsFocused(false);
		}
		if (onSearch) onSearch(value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (onSearch) onSearch(query);
		else navigate(`/browse/search?q=${encodeURIComponent(query)}`);
	};

	useEffect(() => {
		if (!searchParams.get("q")) {
			setQuery("");
			setIsFocused(false);
		}
	}, [location]);

	return (
		<form
			onSubmit={handleSubmit}
			className={`${styles.form} ${isFocused ? styles.active : ""} ${className}`}
		>
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
					if (inputRef.current.value !== "")
						navigate(`/browse/search?q=${encodeURIComponent(query)}`);
				}}
			>
				<div className={styles.icon}>{inline_svgs.search}</div>
			</button>
		</form>
	);
};

export default SearchBar;
