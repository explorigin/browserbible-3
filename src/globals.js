import i18n from './i18n.js';
import $ from 'jQuery';
import XRegExp from 'xregexp';
import ZeroClipboard from 'zeroclipboard';
import ZeroClipboardSWF from 'file!zeroclipboard/dist/ZeroClipBoard.swf';

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

// ZeroClipboard
window['ZeroClipboard'] = ZeroClipboard;
ZeroClipboard.config({moviePath: ZeroClipboardSWF});
