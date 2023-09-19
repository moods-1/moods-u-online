import axios from 'axios';

// import { handleLogout, getToken } from '../helpers/helperFunctions';
import { getToken } from '../helpers/helperFunctions';

export const mainRequest = async (method, url, data) => {
	const token = getToken() || '';
	const headers = { Authorization: token };
	try {
		const response = await axios({ method, url, data, headers });
		return response.data;
	} catch (error) {
		let returnStatus, returnData, responseMessage;
		let { message } = error;
		if (error.response) {
			const { status, data } = error.response;
			returnStatus = status;
			returnData = data;
			responseMessage = data?.message;
			if (status === 401) {
				let messageOut = responseMessage || message;
				console.log(messageOut);
				// handleLogout();
			}
		}
		return { status: returnStatus, message, response: returnData };
	}
};

export const invoiceRequest = async (method, url, id) => {
	const token = getToken() || '';
	const headers = {
		Authorization: token,
	};
	return axios({ url, method, headers, responseType: 'blob' })
		.then((res) => {
			const href = window.URL.createObjectURL(res.data);
			const anchorElement = document.createElement('a');
			anchorElement.href = href;
			anchorElement.download = `invoice-${id}`;
			document.body.appendChild(anchorElement);
			anchorElement.click();
			document.body.removeChild(anchorElement);
			window.URL.revokeObjectURL(href);
		})
		.catch((error) => {
			console.log('error: ', error);
		});
};
