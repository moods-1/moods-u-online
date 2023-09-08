import { mainRequest } from './main';
import { baseUrl, ROUTES } from '../helpers/constants';
const { COURSES } = ROUTES;

export const getAllCourses = async () => {
    const url = `${baseUrl}${COURSES.ALL}`;
    const method = 'get';
    return await mainRequest(method, url, {});
}
