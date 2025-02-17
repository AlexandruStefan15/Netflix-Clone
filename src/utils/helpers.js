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
