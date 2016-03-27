import config from '../config';

function testlocalStorage() {
	try {
		window.localStorage.setItem('1', '2');
		if (localStorage.getItem('1') !== '2') {
			return false;
		}
		window.localStorage.removeItem('1');
		return localStorage.getItem('1') !== '2';
	} catch(e) {
		return false;
	}
}

const storage = testlocalStorage() ? window.localStorage : {};

export function getValue(key, defaultValue) {
	key = config.settingsPrefix + key;

	let returnValue = { ...defaultValue },
		storedValue = storedValue = storage[key];

	if (storedValue == null) {
		return returnValue;
	} else {
		try {
			storedValue = JSON.parse(storedValue);
		} catch (ex) {

		}
	}

	return Object.assign(returnValue, storedValue);
}

export function setValue(key, value) {
	key = config.settingsPrefix + key;
	storage[key] = JSON.stringify(value);
}
