import { useState, useEffect } from "react";

export const useIsElementAtTop = (ref, threshold = 1.0) => {
	const [isAtTop, setIsAtTop] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(([entry]) => setIsAtTop(entry.isIntersecting), {
			root: null,
			threshold,
		});

		observer.observe(element);

		return () => observer.unobserve(element);
	}, [ref, threshold]);

	return isAtTop;
};
