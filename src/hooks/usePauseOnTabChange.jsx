import { useEffect, useRef, useState } from "react";

export default function usePauseOnTabChange(videoRef, videoSrc) {
	const [videoEnded, setVideoEnded] = useState(false);
	const hasTabChanged = useRef(false);

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.hidden) {
				videoRef.current?.pause();
				hasTabChanged.current = true;
			} else {
				if (!videoEnded && hasTabChanged.current) {
					videoRef.current?.play();
				}
				hasTabChanged.current = false;
			}
		};

		const handleVideoEnded = () => {
			setVideoEnded(true);
		};

		const handleVideoPlay = () => {
			setVideoEnded(false);
		};

		if (videoRef.current) {
			videoRef.current.addEventListener("ended", handleVideoEnded);
			videoRef.current.addEventListener("play", handleVideoPlay);
		}

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			videoRef.current?.removeEventListener("ended", handleVideoEnded);
			videoRef.current?.removeEventListener("play", handleVideoPlay);
		};
	}, [videoRef.current, videoEnded]);

	useEffect(() => {
		setVideoEnded(false);
	}, [videoSrc]);

	return null;
}
