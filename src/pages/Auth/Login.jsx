import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CustomInput from '../../components/CustomInput';
import { formValidator } from '../../helpers/helperFunctions';
import { loginUser } from '../../api/user';
import { loadUser } from '../../redux/user';
import { handleLogin } from '../../helpers/helperFunctions';

const Login = ({ handleType }) => {
	const [form, setForm] = useState({
		email: '',
		password: '',
	});
	const [formError, setFormError] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { target } = e;
		const { name, value } = target;
		let localValue;
		if (name !== 'email') {
			localValue = value.replace(/\s{2,}/g, ' ').trimStart();
		} else {
			localValue = value.replace(/\s+/g, '').trimStart();
		}
		setForm((prevState) => ({ ...prevState, [name]: localValue }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		const validatedData = formValidator(form);
		const { error, errorObject } = validatedData;
		setFormError(errorObject);
		if (error) {
			setSubmitting(false);
			return null;
		}

		const result = await loginUser(form);
		const { status, message, response } = result;
		if (status < 400) {
			handleLogin(response);
			dispatch(loadUser(response));
			navigate('/');
		} else {
			handleLoginError(message);
		}
		setSubmitting(false);
		setFormError({});
	};

	const handleLoginError = (message) => {
		setLoginError(message);
		setTimeout(() => {
			setLoginError('');
		}, 4000);
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className='auth-form border shadow-md p-4 rounded-lg '
			>
				<p className='text-center text-4xl font-semibold mb-5'>Login</p>
				<CustomInput
					changeFunction={handleChange}
					placeholder='Email'
					className=''
					label='Email'
					type='text'
					name='email'
					value={form.email}
					invalid={formError.email}
					requiredStar
				/>
				{formError.email && (
					<p className='text-sm text-red-700'>{formError.email}</p>
				)}
				<CustomInput
					changeFunction={handleChange}
					placeholder='Password'
					className=''
					label='Password'
					type='password'
					name='password'
					value={form.password}
					max={12}
					invalid={formError.password}
					requiredStar
				/>
				{formError.password && (
					<p className='text-sm text-red-700'>{formError.password}</p>
				)}
				{loginError && <p className='text-sm text-red-700'>{loginError}</p>}
				<Button
					fullWidth
					sx={{ marginTop: '20px' }}
					type='submit'
					color='primary'
					variant='contained'
					disabled={submitting}
				>
					Login
				</Button>
			</form>
			<p className='text-center my-3'>
				Don't have an account?{' '}
				<span
					className='text-blue-700 font-semibold ml-1 cursor-pointer'
					onClick={() => handleType('Sign Up')}
				>
					Sign Up
				</span>
			</p>
		</div>
	);
};

export default Login;
