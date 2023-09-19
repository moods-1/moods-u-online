import { invoiceRequest } from './main';
import { baseUrl, ROUTES } from '../helpers/constants';
const { INVOICES } = ROUTES;

export const getInvoice = async (id) => {
	const url = `${baseUrl}${INVOICES.GET_INVOICE}/${id}`;
	const method = 'get';
	return await invoiceRequest(method, url, id);
};