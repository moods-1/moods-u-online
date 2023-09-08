export const setLocalStorage = (key, value) => {
	localStorage.setItem(key, value);
};

export const getLocalStorage = (key) => {
	return localStorage.getItem(key);
};

export const clearStorage = () => {
	localStorage.clear();
};

export const deleteStorageItem = (item) => {
	localStorage.removeItem(item);
};

export const setToken = (token) => {
	setLocalStorage('token', token);
};

export const getToken = () => {
	if (getLocalStorage('token')) {
		return getLocalStorage('token');
	}
	return null;
};

export const getUserId = () => {
	const result = getLocalStorage('userId');
	return result;
};

export const getStoredUser = () => {
	if (getLocalStorage('user')) {
		return JSON.parse(getLocalStorage('user'));
	}
	return null;
};

export const getLoggedIn = () => {
	const result = getLocalStorage('loggedIn');
	return result === 'true' ? true : false;
};

export const handleLogin = (data) => {
	const { token, cart } = data;
	let localCart = [];
	// Merge local cart with logged in user cart
	if (getLocalStorage('cart')) {
		let storageCart = JSON.parse(getLocalStorage('cart'));
		// Make sure there are no duplicates in the cart
		localCart = [...new Set([...cart, ...storageCart])];
	} else {
		localCart = [...cart];
	}
	data.cart = localCart;
	setLocalStorage('user', JSON.stringify(data));
	setLocalStorage('cart', JSON.stringify(localCart));
	setLocalStorage('token', token);
	setLocalStorage('loggedIn', true);
};

export const handleUserUpadte = (data) => {
	let localCart;
	if (getLocalStorage('user')) {
		localCart = JSON.parse(getLocalStorage('user'));
		localCart = { ...localCart, ...data };
	} else{
		localCart = { ...data };
	}
	setLocalStorage('user', JSON.stringify(localCart));
}

export function handleLogout() {
	clearStorage();
	window.location.href = '/auth';
}

export const userLogout = () => {
	clearStorage();
};

export const updateStorageCart = (id, type) => {
	let cart = [];
	if (getLocalStorage('cart')) {
		cart = JSON.parse(getLocalStorage('cart'));
		switch (type) {
			case 'add':
				cart = [...new Set([...cart, id])];
				break;
			case 'remove':
				cart = cart.filter((c) => c !== id);
				break;
			case 'clear':
				cart = [];
				break;
			default:
				break;
		}
	} else {
		if (type === 'add') {
			cart.push(id);
		}
	}
	setLocalStorage('cart', JSON.stringify(cart));
};

export const textEllipser = (size, value) => {
	if (!Number(size) || !value) {
		return value;
	}
	if (value.length <= Number(size)) {
		return value;
	} else {
		const shortText = value.slice(0, Number(size));
		return `${shortText}...`;
	}
};

export const numberUnitFormatter = (value) => {
	if (!Number(value)) {
		return value;
	} else if (value < 10 ** 3) {
		return value;
	} else if (value < 10 ** 6) {
		return (value / 10 ** 3).toFixed(1) + 'K';
	} else if (value >= 10 ** 6 && value < 10 ** 9) {
		return (value / 10 ** 6).toFixed(1) + 'M';
	} else if (value >= 10 ** 9 && value < 10 ** 12) {
		return (value / 10 ** 9).toFixed(1) + 'B';
	} else if (value >= 10 ** 12 && value < 10 ** 15) {
		return (value / 10 ** 12).toFixed(1) + 'T';
	}
};

export function makeRandomId(length) {
	let result = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

// Form validation //

export const FORM_FIELDS_DISPLAY = {
	firstName: 'First Name',
	lastName: 'Last Name',
	name: 'Name',
	email: 'Email',
	message: 'Message',
	password: 'Password',
};

export const isValid = (type, pattern, value) => {
	if (type === 'text') {
		return pattern.test(value);
	}
};

export const VALIDATOR_OBJECT = {
	name: { min: 2, max: 25, pattern: '', patternText: '' },
	firstName: { min: 2, max: 25, pattern: '', patternText: '' },
	lastName: { min: 2, max: 25, pattern: '', patternText: '' },
	email: {
		min: 6,
		max: 50,
		pattern: new RegExp(/^\w+([\\.-]?\w+)*@([a-z]{2,3})+\.[a-z]{2,3}/),
		patternText: 'Please enter a valid email address.',
	},
	message: { min: 3, max: 150, pattern: '', patternText: '' },
	password: {
		min: 6,
		max: 20,
		pattern: '',
		patternText: '',
	},
};

// export const validatorText = (target, min, max) => {
// 	return `The ${FORM_FIELDS_DISPLAY[target]} field must between ${min} and ${max} characters.`;
// };

export const validatorText = (target, min, max) => {
	return `This must be between ${min} and ${max} characters.`;
};

export const generateMessage = (pattern, patternText, key, min, max) => {
	return pattern ? patternText : validatorText(key, min, max);
};

export const formValidator = (formObject) => {
	const errorObject = {};
	const errorSet = new Set();
	Object.entries(formObject).forEach(([key, value]) => {
		let error;
		const validator = VALIDATOR_OBJECT[key] || { min: 0, max: 1 };
		const { min, max, pattern, patternText } = validator;
		let message = generateMessage(pattern, patternText, key, min, max);
		switch (key) {
			case 'name':
				error = value.length < min || value.length > max;
				break;
			case 'firstName':
				error = value.length < min || value.length > max;
				break;
			case 'lastName':
				error = value.length < min || value.length > max;
				break;
			case 'message':
				error = value.length < min || value.length > max;
				break;
			case 'password':
				error = value.length < min || value.length > max;
				break;
			case 'email':
				error = pattern
					? !isValid('text', pattern, value)
					: value.length < min || value.length > max;
				break;
			default:
				message = '';
				error = false;
				break;
		}
		errorObject[key] = error ? message : '';
		errorSet.add(error);
	});
	return {error: errorSet.has(true), errorObject};
};

export const suffixSetter=(quantity, unit)=> {
	let localQty = Number(quantity);
	let end = unit.slice(-1).toLowerCase();
	const start = unit.slice(0, -1);
	if (localQty === 0 || localQty > 1) {
	  if (end === "x") {
		return unit + "es";
	  } else if (end === "y") {
		return start + "ies";
	  } else {
		return unit + "s";
	  }
	}
	return unit;
  }