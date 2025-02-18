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
	const groupedGenres = Object.groupBy(genres, (genre) => genre.id);
	const mappedGenres = Object.fromEntries(
		Object.entries(groupedGenres).map(([id, genres]) => [id, genres[0][type]])
	);
	return mappedGenres;
}

export function getFirstSentence(text) {
	if (!text) return "";
	const match = text.match(/[^.!?]+[.!?]/);
	return match ? match[0].trim() : text;
}
