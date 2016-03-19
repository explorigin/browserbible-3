import $ from 'jQuery';
import i18next from 'i18next';
import i18nextJquery from 'jquery-i18next/lib/index';
import LanguageDetector from 'i18next-browser-languagedetector/lib/index';
import config from './config';

// Internationalization: i18n

const WebpackLoaderBackend = {
	type: 'backend',
	init: (services, options = {}) => { },

	read: (language, namespace, callback) => {
		const langSplit = language.split('-');
		if (langSplit[0] != 'zh') {
			language = langSplit[0];
		}
		require(`./resources/${language}`)().then((data) => {
			callback(null, data[namespace]);
		});
	}
};

i18nextJquery.init(i18next, $, {
	tName: 't', // --> appends $.t = i18next.t
	i18nName: 'i18n', // --> appends $.i18n = i18next
	handleName: 'i18n' // --> appends $(selector).localize(opts);
});

const isReady = new Promise((resolve, reject) => {
	i18next.use(LanguageDetector).use(WebpackLoaderBackend).init({
		fallbackLng: config.defaultLanguage,
		detection: {
			order: ['querystring', 'cookie', 'localStorage', 'navigator'],
			lookupQuerystring: 'lng',
			lookupCookie: 'i18next',
			lookupLocalStorage: 'i18nextLng',
			caches: ['localStorage', 'cookie']
		}
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
