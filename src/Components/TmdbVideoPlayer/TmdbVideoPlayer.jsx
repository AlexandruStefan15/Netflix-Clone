import { useEffect, useState } from "react";
import styles from "./TmdbVideoPlayer.module.scss";

const TMDbVideoPlayer = ({ id, type = "movie", image }) => {
	const [videoId, setVideoId] = useState(null);
	const [player, setPlayer] = useState(null);
	const [error, setError] = useState(null);
	const playerContainerId = "player";
	const API_KEY = "318dc067de589bc7b276ad2334cac8d8";
	const API_URL = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}`;

	useEffect(() => {
		setVideoId(null);

		if (!window.YT) {
			const script = document.createElement("script");
			script.src = "https://www.youtube.com/iframe_api";
			script.async = true;
			document.body.appendChild(script);
		}

		const fetchVideo = () => {
			fetch(API_URL)
				.then((response) => response.json())
				.then((data) => {
					const youtubeVideo = data.results.find(
						(video) => video.type === "Trailer" && video.site === "YouTube"
					);
					if (youtubeVideo) {
						setVideoId(youtubeVideo.key);
					} else setError("No YouTube trailer found");
				})
				.catch((error) => {
					console.error("Error fetching video data:", error);
					setError(error);
				});
		};

		if (window.YT && window.YT.Player) {
			fetchVideo();
		} else {
			window.onYouTubeIframeAPIReady = fetchVideo;
		}
	}, [id, type]);

	useEffect(() => {
		if (videoId && window.YT) {
			if (player) {
				player.loadVideoById(videoId);
			} else {
				const newPlayer = new window.YT.Player(playerContainerId, {
					height: "100%",
					width: "100%",
					videoId: videoId,
					playerVars: {
						autoplay: 0,
						enablejsapi: 1,
						controls: 1,
						modestbranding: 1,
						rel: 0,
						showinfo: 0,
						fs: 1,
						iv_load_policy: 3,
						mute: 0,
					},
					events: {
						onStateChange: (event) => {
							if (event.data === window.YT.PlayerState.ENDED) {
								console.log("Video has ended");
							}
						},
						onReady: (event) => {
							const iframe = event.target.getIframe();
							iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
						},
					},
				});
				setPlayer(newPlayer);
			}
		}
	}, [videoId, id]);

	if (error)
		return (
			<div className={styles.image}>
				<img src={image} alt={"movie backdrop"} />
			</div>
		);

	return (
		<div className={styles.playerContainer} id="player-container">
			<div
				id={playerContainerId}
				style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
			></div>
		</div>
	);
};

export default TMDbVideoPlayer;
