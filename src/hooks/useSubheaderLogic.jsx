import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export function useSubheaderLogic() {
	const [showSubheader, setShowSubheader] = useState(false);
	const [isTop, setIsTop] = useState(false);
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		setShowSubheader(["/browse/movies", "/browse/tv-series"].includes(location.pathname));
	}, [location.pathname]);

	useEffect(() => {
		const handleScroll = () => {
			setIsTop(window.scrollY === 0);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	function getTitle() {
		const segments = location.pathname.split("/").filter(Boolean);
		const lastSegment = segments.length > 0 ? segments[segments.length - 1] : null;

		switch (lastSegment) {
			case "movies":
				return "Filme";
			case "tv-series":
				return "Seriale";
			default:
				return "";
		}
	}
}

return { showSubheader, isTop, getTitle, searchParams, setSearchParams };
