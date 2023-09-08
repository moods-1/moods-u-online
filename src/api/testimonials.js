import { mainRequest } from './main';
import { baseUrl, ROUTES } from '../helpers/constants';
const {TESTIMONIALS } = ROUTES;

export const getTestimonials = async (size) => {
    const url = `${baseUrl}${TESTIMONIALS.GET_BY_SIZE}${size}`;
    const method = 'get';
    return await mainRequest(method, url, {});
}
