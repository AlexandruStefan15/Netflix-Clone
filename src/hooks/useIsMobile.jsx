import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 512) {
	const [isMobile, setIsMobile] = useState(
		window.matchMedia(`(max-width: ${breakpoint}px)`).matches
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
		const handleChange = (e) => setIsMobile(e.matches);

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, [breakpoint]);

	return isMobile;
}
