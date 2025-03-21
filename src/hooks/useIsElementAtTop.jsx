import { useState, useEffect } from "react";

export const useIsElementAtTop = (ref, threshold = 1.0) => {
	const [isAtTop, setIsAtTop] = useState(true);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(([entry]) => setIsAtTop(entry.isIntersecting), {
			root: null,
			threshold,
		});

		observer.observe(element);

		return () => observer.unobserve(element);
	}, [threshold]);

	return isAtTop;
};
