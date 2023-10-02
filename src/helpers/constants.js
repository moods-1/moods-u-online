import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';

import { DollarSign, Support, Handshake } from '../assets';

// export const baseUrl = 'http://localhost:5050/api';
export const baseUrl = 'https://moods-u-server.vercel.app/api';

export const ROUTES = {
	COURSES: {
		ALL: '/courses',
	},
	USERS: {
		SIGN_UP: '/users/signup',
		LOGIN: '/users/login',
		GET: '/users',
		GET_BY_ID: '/users/by-id',
		UPDATE: '/users/update-user',
		UPDATE_CART: '/users/update-cart',
		UPDATE_CHECKOUT: '/users/checkout',
	},
	TESTIMONIALS: {
		GET_BY_SIZE: '/testimonials/by-size/',
	},
	EMPLOYEES: {
		GET_BY_DEPARTMENT: '/employees/by-department/',
	},
	STRIPE: {
		GET_CONFIG: '/stripe/config',
		CREATE_INTENT: '/stripe/create-payment-intent',
		GET_COMPLETE_INTENT: '/stripe/get-completed-intent',
		REGISTER_PAYMENT: '/stripe/register-payment',
	},
	INVOICES: {
		GET_INVOICE: '/invoices',
	},
	ORDERS: {
		GET_ORDERS: '/orders',
	},
};

export const HEADER_LINKS = [
	{
		name: 'Home',
		route: '/',
	},
	{
		name: 'Courses',
		route: '/courses',
	},
	{
		name: 'Contact',
		route: '/contact',
	},
];

export const HERO_TYPEWRITER = ['Success', 'The Future'];

export const COMPANY_DEPARTMENTS = {
	FINANCE: 'Finance',
	HUMAN_RESOURCES: 'Human Resources',
	SUPPORT: 'Support',
	TEACHING: 'Teaching',
};

export const signUpSchema = Yup.object({
	firstName: Yup.string()
		.max(25, 'Must be 25 characters or less.')
		.min(2, 'Must be between 2 to 25 characters.'),
	lastName: Yup.string()
		.max(25, 'Must be 25 characters or less.')
		.min(2, 'Must be between 2 to 25 characters.'),
	email: Yup.string().matches(
		/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
		'Invalid email address.'
	),
	password: Yup.string()
		.required('Please enter a password.')
		.min(6, 'Must be at least 6 characters.')
		.max(12, 'Must be between 6 and 12 characters.'),
});

export const userModalSchema = Yup.object({
	firstName: Yup.string()
		.max(25, 'Must be 25 characters or less.')
		.min(2, 'Must be between 2 to 25 characters.'),
	lastName: Yup.string()
		.max(25, 'Must be 25 characters or less.')
		.min(2, 'Must be between 2 to 25 characters.'),
	email: Yup.string().matches(
		/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
		'Invalid email address.'
	),
	message: Yup.string()
		.max(200, 'Must be 200 characters or less.')
		.min(2, 'Must be between 2 to 200 characters.'),
});

export const loginSchema = Yup.object({
	email: Yup.string().matches(
		/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
		'Invalid email address.'
	),
	password: Yup.string()
		.required('Please enter a password.')
		.min(6, 'Must be at least 6 characters.')
		.max(12, 'Must be between 6 and 12 characters.'),
});

export const BENEFITS = [
	{
		largeValue: '90K',
		title: '2023 Average Graduate Salary',
		text: 'Our programs help graduates to manifest the future they have always dreamed of.',
		image: DollarSign,
	},
	{
		largeValue: '100%',
		title: 'Alumni Support for Current Students',
		text: 'The alumni community is vast and very supportive. Post graduates always make themselves available for at least an hour every week.',
		image: Support,
	},
	{
		largeValue: '99%',
		title: 'Hire Rate Post Completion',
		text: 'Within 3 months post course completion, 99% of our graduates find employment. We utilize propriety tools to achieve this success rate.',
		image: Handshake,
	},
];

export const SKILL_FILTER_DATA = [
	{
		value: 'Beginner',
		name: 'Beginner',
	},
	{
		value: 'Intermediate',
		name: 'Intermediate',
	},
];

export const RATINGS_FILTER_DATA = [
	{
		name: 'star1',
		value: 1,
	},
	{
		name: 'star2',
		value: 2,
	},
	{
		name: 'star3',
		value: 3,
	},
	{
		name: 'star4',
		value: 4,
	},
];

export const PRICE_FILTER_DATA = [
	{
		name: 'one',
		value: { min: 0, max: 10 },
	},
	{
		name: 'two',
		value: { min: 10, max: 15 },
	},
	{
		name: 'three',
		value: { min: 15, max: 20 },
	},
	{
		name: 'four',
		value: { min: 20, max: Number.MAX_SAFE_INTEGER },
	},
];

export const CURRENCIES = {
	CANADIAN: 'cad',
	UNITED_STATES: 'usd',
	EURO: 'eur',
};

export const THINGS_TO_KNOW = [
	{
		id: '001',
		data: <span className='-mt-[2px]'>Learn at your own pace</span>,
	},
	{
		id: '002',
		data: (
			<span className='-mt-[2px]'>You have unlimited access your courses</span>
		),
	},
	{
		id: '003',
		data: (
			<span className='-mt-[2px]'>
				Our{' '}
				<NavLink to='/contact' className='text-blue-600 font-medium'>
					{' '}
					support team
				</NavLink>{' '}
				is always ready to help
			</span>
		),
	},
	{
		id: '004',
		data: (
			<span className='-mt-[2px]'>
				Contact us when you are ready to take a test
			</span>
		),
	},
	{
		id: '005',
		data: (
			<span className='-mt-[2px]'>
				We have mentors to help you prepare for certification
			</span>
		),
	},
];
