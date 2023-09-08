import axios from 'axios';

import { handleLogout,getToken } from '../helpers/helperFunctions';

export const mainRequest = async (method, url, data) => {
	const token = getToken() || '';
	const headers = { Authorization: token };
	try {
		const response = await axios({ method, url, data, headers });
		return response.data;
	} catch (error) {
		const { message } = error;
		const { status, data } = error.response;
		if (status === 401) {
			handleLogout();
		}
		return { status, message, response:data };
	}
};
