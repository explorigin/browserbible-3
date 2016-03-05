import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector/lib/index';

// Internationalization: i18n

const isReady = new Promise((resolve, reject) => {
	i18next.use(LanguageDetector).init({
		fallbackLng: sofia.config.defaultLanguage,
		detection: {
			order: ['querystring', 'cookie', 'localStorage', 'navigator'],
			lookupQuerystring: 'lng',
			lookupCookie: 'i18next',
			lookupLocalStorage: 'i18nextLng',
			caches: ['localStorage', 'cookie']
		},
		resources: sofia.resources
	}, (err, t) => {
		if (err) {
			reject(err);
		} else {
			resolve(t);
		}
	});
});

export default {
	't': i18next.t,
	'ext': i18next,
	isReady
};
