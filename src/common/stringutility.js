export default function parseQuerystring(querystring) {
	querystring = querystring || window.location.search.substring(1);

	// remove any preceding url and split
	querystring = querystring.substring(querystring.indexOf('?')+1).split('&');
	var params = {}, pair, d = decodeURIComponent;
	// march and parse
	for (var i = querystring.length - 1; i >= 0; i--) {
		pair = querystring[i].split('=');
		params[d(pair[0])] = d(pair[1]);
	}

	return params;
}

if (!Array.prototype.filter) {
	Array.prototype.filter = function(fun /*, thisp */) {
		if (this === void 0 || this === null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== 'function')
			throw new TypeError();

		var res = [];
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in t) {
				var val = t[i]; // in case fun mutates this
				if (fun.call(thisp, val, i, t))
					res.push(val);
			}
		}

		return res;
	};
}

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj, start) {
		for (var i = (start || 0), j = this.length; i < j; i++) {
			if (this[i] === obj) {
				return i;
			}
		}
		return -1;
	};
}

if(typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	};
};
