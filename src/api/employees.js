import { mainRequest } from './main';
import { baseUrl, ROUTES } from '../helpers/constants';
const {EMPLOYEES } = ROUTES;

export const getEmployeesByDepartment = async (department) => {
    const url = `${baseUrl}${EMPLOYEES.GET_BY_DEPARTMENT}${department}`;
    const method = 'get';
    return await mainRequest(method, url, {});
}
