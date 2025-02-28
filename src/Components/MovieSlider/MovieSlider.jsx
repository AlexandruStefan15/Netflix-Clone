import React, { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Slider from "react-slick";
import "./MovieSlider.scss";
import { inline_svgs } from "../../Assets/svgs/svgs";
import { usePreventClickAfterDrag } from "../../hooks/usePreventClickAfterDrag";
import { isSmartTV } from "../../utils/helpers";

const imageURL = `https://image.tmdb.org/t/p/w400`;

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className="movie-slider_left-arrow"
			style={{ ...style, display: "block" }}
			onClick={onClick}
		>
			{inline_svgs.left_arrow_v2}
		</div>
	);
}

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className="movie-slider_right-arrow"
			style={{ ...style, display: "block" }}
			onClick={onClick}
		>
			{inline_svgs.right_arrow_v2}
		</div>
	);
}

export default function MovieSlider({ movies, ...props }) {
	const isTV = isSmartTV();
	const isMobile = useOutletContext().isMobile;
	const settings = {
		className: "movie-slider" + (isTV ? " isTV" : ""),
		infinite: isMobile ? false : true,
		centerMode: isTV || isMobile ? false : true,
		centerPadding: "75px",
		slidesToShow: isMobile ? 3.2 : 6,
		slidesToScroll: isTV ? 6 : 1,
		swipeToSlide: true,
		dots: false,
		arrows: isMobile ? false : true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};
	const wrapperRef = useRef(null);
	const isDragging = usePreventClickAfterDrag(wrapperRef);

	return (
		<div ref={wrapperRef}>
			<Slider {...settings}>
				{movies.map(
					(movie) =>
						movie.poster_path && (
							<div
								key={movie.id}
								className="movie-slider_movie"
								onClick={() => {
									if (!isDragging) {
										props.handleMovieClick(movie);
									}
								}}
							>
								<img src={imageURL + movie.poster_path} alt="movie poster" loading="lazy" />
							</div>
						)
				)}
			</Slider>
		</div>
	);
}
