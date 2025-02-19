export function isSmartTV() {
	let screenWidth = window.screen.width;
	let ua = navigator.userAgent.toLowerCase();
	return (
		screenWidth >= 1920 &&
		/smart-tv|smarttv|hbbtv|netcast|viera|webos|tizen|googletv|sonydtv|appletv|roku|firetv|androidtv|chromecast/.test(
			ua
		)
	);
}

export function mapGenres(genres, type = "name") {
	return genres.reduce((acc, genre) => {
		acc[genre.id] = genre[type];
		return acc;
	}, {});
}

export function getFirstSentence(text) {
	if (!text) return "";
	const match = text.match(/[^.!?]+[.!?]/);
	return match ? match[0].trim() : text;
}
