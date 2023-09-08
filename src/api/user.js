import { mainRequest } from './main';
import { baseUrl, ROUTES } from '../helpers/constants';
const { USERS } = ROUTES;

export const signUpUser = async (data) => {
	const url = `${baseUrl}${USERS.SIGN_UP}`;
	const method = 'post';
	return await mainRequest(method, url, data);
};

export const loginUser = async (data) => {
	const url = `${baseUrl}${USERS.LOGIN}`;
	const method = 'post';
	return await mainRequest(method, url, data);
};

export const updateUserDetails = async (data) => {
	const url = `${baseUrl}${USERS.UPDATE}`;
	const method = 'patch';
	return await mainRequest(method, url, data);
};

export const updateCart = async (data) => {
	const url = `${baseUrl}${USERS.UPDATE_CART}`;
	const method = 'post';
	return await mainRequest(method, url, data);
};

export const checkout = async (data) => {
	const url = `${baseUrl}${USERS.CHECKOUT}`;
	const method = 'post';
	return await mainRequest(method, url, data);
};


