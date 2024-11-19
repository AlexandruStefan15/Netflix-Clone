import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import english from "./locales/en/index";
import romanian from "./locales/ro/index";

i18n.use(initReactI18next).init({
	debug: true,
	fallbackLng: "ro",
	interpolation: {
		escapeValue: false,
	},
	resources: {
		ro: {
			translation: romanian,
		},
		en: {
			translation: english,
		},
	},
	lng: "ro",
});

export default i18n;
