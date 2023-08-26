import netflix_logo from "../svgs/Netflix_logo.svg";
import dropDown_arrow from "./dropDown_arrow.svg";
import globe from "./globe.svg";
import right_arrow from "./right_arrow.svg";

const svgs = {
	netflix_logo,
	dropDown_arrow,
	globe,
	right_arrow,
};

export default svgs;

export const inline_svgs = {
	cross: (
		<svg viewBox="0 0 22 22">
			<path d="M10.5 9.3L1.8 0.5 0.5 1.8 9.3 10.5 0.5 19.3 1.8 20.5 10.5 11.8 19.3 20.5 20.5 19.3 11.8 10.5 20.5 1.8 19.3 0.5 10.5 9.3Z" />
		</svg>
	),
	right_arrow: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 23" height="24" width="24">
			<path d="M8.025 22 6.25 20.225 14.475 12 6.25 3.775 8.025 2l10 10Z" />
		</svg>
	),
};
