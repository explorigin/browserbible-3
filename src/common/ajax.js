import $ from 'jQuery';
import config from '../config';

const { baseContentApiPath, baseContentApiKey, baseContentUrl } = config;

export default function ajax(params) {

	var $params = {
		...params,
		success: function(data) {
			if (params.success) {
				// convert back to text
				if ((params.dataType == 'text' || params.dataType == 'html') && baseContentApiPath != '') {
					data = data.text;
				}

				params.success(data);
			}
		}
	};

	if ($params.url.indexOf('http') != 0) {
		$params.url =
				// base URL
				baseContentUrl +
				// API settings
				(baseContentApiPath != '' ? `${baseContentApiPath}?key=${baseContentApiKey}&action=` : '') +
				// then plain URL
				$params.url;

		// add type overrides if possible
		if ($params.dataType == 'json') {
			$params.beforeSend = function(xhr){
				if (xhr.overrideMimeType){
					xhr.overrideMimeType('application/' + (baseContentApiPath != '' ? 'javascript' : 'json'));
				}
			};
		}

		// change setting
		if (baseContentApiPath != '') {
			$params.dataType = 'jsonp';
		}
	}

	// run through jQuery
	$.ajax($params);
};
