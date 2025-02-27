import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function usePauseOnTabChange(videoRef, videoSrc) {
	const [videoEnded, setVideoEnded] = useState(false);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		if (searchParams.get("mid")) {
			video.pause();
		} else if (!videoEnded) {
			video.play();
		}
	}, [searchParams.get("mid")]);

	useEffect(() => {
		const video = videoRef.current;
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
