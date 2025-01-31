import { useState, useEffect } from "react";

export const usePreventClickAfterDrag = (ref) => {
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		if (!ref.current) return;
		const element = ref.current;

		const handleMouseDown = () => setIsDragging(false);
		const handleMouseMove = () => setIsDragging(true);
		const handleMouseUp = () => setTimeout(() => setIsDragging(false), 100);

		element.addEventListener("mousedown", handleMouseDown);
		element.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			element.removeEventListener("mousedown", handleMouseDown);
			element.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [ref]);

	return isDragging;
};
