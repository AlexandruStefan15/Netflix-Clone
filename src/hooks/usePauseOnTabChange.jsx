import { useEffect } from "react";

export default function usePauseOnTabChange(videoRef) {
	useEffect(() => {
		const handleVisibilityChange = (e) => {
			if (document.hidden) {
				videoRef.current?.pause();
			} else {
				videoRef.current?.play();
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [videoRef]);
}
