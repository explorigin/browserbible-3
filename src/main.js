import i18n from './i18n';
import $ from 'jQuery';
import config from './config';
import sofia from './namespace';


function runInit() {
	i18n.isReady.then(init)
		.catch(console.error.bind(console))
		.then(() => {
			var lang = i18n.ext.language, langSelector = $('#config-language');

			langSelector.val( lang );

			if (lang != langSelector.val() ) {
				langSelector.val( lang.split('-')[0] );
			}

			if (langSelector[0] && langSelector[0].localizeLanguages) {
				langSelector[0].localizeLanguages();
			}

			$('.i18n').i18n();
		});
}

function init() {
	// load config
	let params = stringUtility.parseQuerystring(),
		custom = params['custom'],
		ua = navigator.userAgent.toLowerCase(),
		isiOSApp = (ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1) && window.location.protocol === 'file:';

	if (custom !== undefined && custom !== '') {
		let customizations = config.profiles[custom];

		if (custom !== undefined && customizations != null) {
			Object.assign(config, customizations);
		}
	}

	// load css
	if (typeof config.customCssUrl != 'undefined' && config.customCssUrl != '') {
		$(`<link href="${config.customCssUrl}" rel="stylesheet" />`).appendTo( $('head') );
	}

	if (window.navigator.standalone === true || isiOSApp) {
		$('body').addClass('app-mobile-fullscreen');
	}

	// run inits
	sofia.initMethods.forEach((m) => m());

	// create app
	sofia.app = new App();
	sofia.app.init();
}

// jQuery onDOMReady
$(() => {
	// hide initial text area
	$('#startup').hide();

	// test for local file support
	if (window.location.protocol === 'file:') {
		$.ajax({
			dataType: 'text',
			url: 'about.html',
			success: runInit,
			error: function(e) {
				var modal = new MovableWindow( Math.min(500, $(window).width()) ,250, 'Local Files Error'),
					errorMessage = '',
					ua = navigator.userAgent.toLowerCase();

				if (ua.indexOf('chrome') > -1) {
					if (ua.indexOf('mac os') > -1) {
						errorMessage =
							'<p>Mac, Terminal</p>' +
							'<code>/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --allow-file-access-from-files</code>';
					} else
					if (ua.indexOf('windows') > -1) {
						errorMessage =
							'<p>Mac, Terminal</p>' +
							'<code>/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --allow-file-access-from-files</code>';
					}
				} else {
					errorMessage = '<p>Unknown error loading files (cannot load about.html)' + e + '</p>';
				}

				modal.body.css({background: '#000', color: '#fff' }).html(
					'<div style="padding: 20px;">' +
						errorMessage +
					'</div>'
				);
				modal.show().center();
			}
		});

	} else {
		runInit();
	}
});
