import { mainRequest } from './main';
import { baseUrl, ROUTES } from '../helpers/constants';
const { ORDERS } = ROUTES;

export const getAllOrders = async (userId) => {
    const url = `${baseUrl}${ORDERS.GET_ORDERS}/${userId}`;
    const method = 'get';
    return await mainRequest(method, url, {});
}
