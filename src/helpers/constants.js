import * as Yup from 'yup';
import { DollarSign, Support, Handshake } from '../assets';

export const baseUrl = 'http://localhost:5050/api';

export const ROUTES = {
	COURSES: {
		ALL: '/courses',
	},
	USERS: {
		SIGN_UP: '/users/signup',
		LOGIN: '/users/login',
		GET: '/users',
		UPDATE: '/users/update-user',
		UPDATE_CART: '/users/update-cart',
		CHECKOUT: '/users/checkout',
	},
	TESTIMONIALS: {
		GET_BY_SIZE: '/testimonials/by-size/',
	},
	EMPLOYEES: {
		GET_BY_DEPARTMENT: '/employees/by-department/',
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
		name: 'beginner',
	},
	{
		value: 'Intermediate',
		name: 'intermediate',
	},
	{
		value: 'Advanced',
		name: 'advanced',
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
