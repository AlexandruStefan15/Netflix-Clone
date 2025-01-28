import React from "react";
import Slider, { Component } from "react-slick";
import "./MovieSlider.scss";
import { inline_svgs } from "../../Assets/svgs/svgs";

const imageURL = `https://image.tmdb.org/t/p/w500`;

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
	const settings = {
		className: "movie-slider",
		infinite: true,
		centerMode: true,
		centerPadding: "75px",
		slidesToShow: 6,
		slidesToScroll: 1,
		swipeToSlide: true,
		dots: false,
		arrows: true,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	return (
		<Slider {...settings}>
			{movies.map(
				(movie, index) =>
					movie.poster_path && (
						<div
							key={index}
							className="movie-slider_movie"
							onClick={() => props.handleMovieClick(movie)}
						>
							<img src={imageURL + movie.poster_path} alt="" />
						</div>
					)
			)}
		</Slider>
	);
}
