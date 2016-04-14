import config from './config';
import ajax from './common/ajax';
import languages from './resources/index';

export default {
	'version': '3.8.1',
	'plugins': [],
	'windowTypes': [],
	'menuComponents': [],
	'initMethods': [],
	'globals': {},
	'textproviders': {},
	// 'analytics': {}, // TODO - see texts/textloader.js
	config,
	languages,
	ajax
};
