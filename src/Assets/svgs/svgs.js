import netflix_logo from "../svgs/Netflix_logo.svg";
import dropDown_arrow from "./dropDown_arrow.svg";
import globe from "./globe.svg";
import right_arrow from "./right_arrow.svg";
import left_arrow_v2 from "./left_arrow_v2.svg";
import mask from "./mask.svg";

const svgs = {
	netflix_logo,
	dropDown_arrow,
	globe,
	right_arrow,
	left_arrow_v2,
	mask,
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

	left_arrow_v2: (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
		</svg>
	),

	right_arrow_v2: (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
		</svg>
	),

	right_arrow_thick: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			role="img"
			viewBox="0 0 24 24"
			width="40"
			height="40"
			data-icon="PlayStandard"
			aria-hidden="true"
		>
			<path
				d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"
				fill="currentColor"
			></path>
		</svg>
	),

	exclamation_mark: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			role="img"
			viewBox="0 0 24 24"
			width="40"
			height="40"
			data-icon="CircleIStandard"
			aria-hidden="true"
		>
			<path
				d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
				fill="currentColor"
			></path>
		</svg>
	),

	ring_bell: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			role="img"
			viewBox="0 0 24 24"
			width="23"
			height="23"
			data-icon="BellStandard"
			aria-hidden="true"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13.0002 4.07092C16.3924 4.55624 19 7.4736 19 11V15.2538C20.0489 15.3307 21.0851 15.4245 22.1072 15.5347L21.8928 17.5232C18.7222 17.1813 15.4092 17 12 17C8.59081 17 5.27788 17.1813 2.10723 17.5232L1.89282 15.5347C2.91498 15.4245 3.95119 15.3307 5.00003 15.2538V11C5.00003 7.47345 7.60784 4.55599 11.0002 4.07086V2H13.0002V4.07092ZM17 15.1287V11C17 8.23858 14.7614 6 12 6C9.2386 6 7.00003 8.23858 7.00003 11V15.1287C8.64066 15.0437 10.3091 15 12 15C13.691 15 15.3594 15.0437 17 15.1287ZM8.62593 19.3712C8.66235 20.5173 10.1512 22 11.9996 22C13.848 22 15.3368 20.5173 15.3732 19.3712C15.3803 19.1489 15.1758 19 14.9533 19H9.0458C8.82333 19 8.61886 19.1489 8.62593 19.3712Z"
				fill="currentColor"
			></path>
		</svg>
	),

	account: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			role="img"
			viewBox="0 0 24 24"
			width="22"
			height="22"
			data-icon="UserStandard"
			aria-hidden="true"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5ZM17 5C17 7.76142 14.7614 10 12 10C9.23858 10 7 7.76142 7 5C7 2.23858 9.23858 0 12 0C14.7614 0 17 2.23858 17 5ZM4 21C4 16.5817 7.58172 13 12 13C16.4183 13 20 16.5817 20 21V21.5136C19.5678 21.5667 18.9844 21.6327 18.2814 21.6988C16.6787 21.8495 14.461 22 12 22C9.53901 22 7.32131 21.8495 5.71861 21.6988C5.01564 21.6327 4.43224 21.5667 4 21.5136V21ZM21.1508 23.3775C21.1509 23.3774 21.151 23.3774 21 22.3889L21.151 23.3774C21.6393 23.3028 22 22.8829 22 22.3889V21C22 15.4772 17.5228 11 12 11C6.47715 11 2 15.4772 2 21V22.3889C2 22.8829 2.36067 23.3028 2.84897 23.3774L3 22.3889C2.84897 23.3774 2.84908 23.3774 2.8492 23.3775L2.84952 23.3775L2.85043 23.3776L2.85334 23.3781L2.86352 23.3796L2.90103 23.3852C2.93357 23.3899 2.98105 23.3968 3.04275 23.4055C3.16613 23.4228 3.3464 23.4472 3.57769 23.4765C4.04018 23.535 4.7071 23.6126 5.5314 23.6901C7.1787 23.8449 9.461 24 12 24C14.539 24 16.8213 23.8449 18.4686 23.6901C19.2929 23.6126 19.9598 23.535 20.4223 23.4765C20.6536 23.4472 20.8339 23.4228 20.9573 23.4055C21.0189 23.3968 21.0664 23.3899 21.099 23.3852L21.1365 23.3796L21.1467 23.3781L21.1496 23.3776L21.1505 23.3775L21.1508 23.3775Z"
				fill="currentColor"
			></path>
		</svg>
	),

	search: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			role="img"
			viewBox="0 0 24 24"
			width="23"
			height="23"
			data-icon="MagnifyingGlassStandard"
			aria-hidden="true"
			className="search-icon"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10ZM15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L22.7071 21.2929L21.2929 22.7071L15.6177 17.0319Z"
				fill="currentColor"
			></path>
		</svg>
	),
};
