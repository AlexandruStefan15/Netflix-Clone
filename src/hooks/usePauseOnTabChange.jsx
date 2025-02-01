import { useEffect, useState } from "react";

export default function usePauseOnTabChange(videoRef, videoSrc) {
	const [videoEnded, setVideoEnded] = useState(false);

	useEffect(() => {
		const video = videoRef.current; // Store reference inside effect
		if (!video) return;

		const handleVisibilityChange = () => {
			if (document.hidden) {
				video.pause();
			} else {
				if (!videoEnded) {
					video.play();
				}
			}
		};

		const handleVideoEnded = () => {
			setVideoEnded(true);
			console.log("Video has ended");
		};

		video.addEventListener("ended", handleVideoEnded);
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			video.removeEventListener("ended", handleVideoEnded);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [videoRef.current, videoEnded]);

	useEffect(() => {
		setVideoEnded(false);
	}, [videoSrc]);

	return null;
}
