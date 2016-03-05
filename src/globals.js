import i18n from './i18n.js';
import $ from 'jQuery';
import i18nextJquery from 'jquery-i18next/lib/index';
import XRegExp from 'xregexp';

// While we are only partially implemented, some tools that exist in in modules
// must be exposed as globals so that old code can reference them where they
// are expected. As more libraries are modularized, this file will grow and as
// application code is modularized this file will shrink.

// XRegExp
window['XRegExp'] = XRegExp;

// jQuery
window['$'] = $;

// i18n
window.i18n = i18n;
i18nextJquery.init(i18n.ext, $, {
	tName: 't', // --> appends $.t = i18next.t
	i18nName: 'i18n', // --> appends $.i18n = i18next
	handleName: 'i18n' // --> appends $(selector).localize(opts);
});
