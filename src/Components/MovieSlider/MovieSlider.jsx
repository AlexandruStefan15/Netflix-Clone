import React from "react";
import Slider, { Component } from "react-slick";
import "./MovieSlider.scss";
import images from "../../Assets/images/images";

const imageURL = `https://image.tmdb.org/t/p/w500`;

export default function MovieSlider({ movies }) {
	const settings = {
		className: "slider",
		infinite: true,
		centerMode: true,
		centerPadding: "60px",
		slidesToShow: 6,
		slidesToScroll: 1,
		swipeToSlide: true,
		dots: false,
		arrows: true,
	};

	return (
		<Slider {...settings}>
			{movies.map((movie, index) => (
				<div key={index} className="movie">
					<img src={imageURL + movie.poster_path} alt="" />
				</div>
			))}
		</Slider>
	);
}
