import { RemixI18Next } from "remix-i18next/server";

import * as i18n from "~/i18n";

export default new RemixI18Next({
	detection: {
		supportedLanguages: i18n.supportedLngs,
		fallbackLanguage: i18n.fallbackLng,
	},
	i18next: {
		...i18n,
	},
});
