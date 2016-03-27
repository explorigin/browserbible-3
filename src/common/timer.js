
export default function Timer(callback, seconds) {

	var timeoutValue = null;
	function start() {
		if (timeoutValue == null) {
			clear();

			timeoutValue = setTimeout(function() {
				callback();
				clear();
			}, seconds);
		}
	}
	function clear() {
		if (timeoutValue != null) {
			clearTimeout(timeoutValue);
			timeoutValue = null;
		}
	}

	return {
		start: start,
		clear: clear
	};
};
