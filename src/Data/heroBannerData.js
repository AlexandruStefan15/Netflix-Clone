import images from "../Assets/images/images";
import videos from "../Assets/videos/videos";

const bannerDataMap = {
	set1: {
		"/browse": {
			video: videos.queensGambit,
			image: images.queensGambit,
			movieLogo: "https://image.tmdb.org/t/p/original/aNOWJOfaLlSZlQ93mCz4bsrjHm2.png",
			subtitle:
				"În anii șaizeci, o tânără orfană descoperă un talent neobișnuit pentru șah, care o propulsează din orfelinat direct pe scena competițiilor internaționale.",
		},

		"/browse/movies": {
			video: videos.inception,
			image: images.inception,
			movieLogo: "https://image.tmdb.org/t/p/original/8ThUfwQKqcNk6fTOVaWOts3kvku.png",
			subtitle:
				"Un hoț care fură secrete corporative prin utilizarea tehnologiei de partajare a viselor i se încredințează sarcina de a planta o idee în mintea unui C.E.O pentru a-și asigura libertatea.",
		},

		"/browse/tv-series": {
			video: videos.aliceInBorderland,
			image: images.aliceInBorderland,
			movieLogo: "https://image.tmdb.org/t/p/original/llCdgREXybsD9oeQ8dbWOxMmIR8.png",
			subtitle:
				"Un grup de prieteni se trezesc într-o lume străină, unde sunt forțați să participe la jocuri mortale pentru a supraviețui.",
		},
	},
};

export function getBannerData(set, pathname) {
	return bannerDataMap[set][pathname];
}
