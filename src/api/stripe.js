import { mainRequest } from './main';
import { baseUrl, ROUTES } from '../helpers/constants';
const { STRIPE } = ROUTES;

export const getStripeConfig = async () => {
	const url = `${baseUrl}${STRIPE.GET_CONFIG}`;
	const method = 'get';
	return await mainRequest(method, url, {});
};

export const createPaymentIntent = async (requestBody) => {
	const url = `${baseUrl}${STRIPE.CREATE_INTENT}`;
	const method = 'post';
	return await mainRequest(method, url, requestBody);
};

export const registerPayment = async (requestBody) => {
	const url = `${baseUrl}${STRIPE.REGISTER_PAYMENT}`;
	const method = 'post';
	return await mainRequest(method, url, requestBody);
};

export const makePayment = async (requestBody) => {
	const url = `${baseUrl}${STRIPE.MAKE_PAYMENT}`;
	const method = 'post';
	return await mainRequest(method, url, requestBody);
};

export const getCompleteIntent = async (intent) => {
	const url = `${baseUrl}${STRIPE.GET_COMPLETE_INTENT}/${intent}`;
	const method = 'get';
	return await mainRequest(method, url, {});
};
