import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CustomInput from '../../components/CustomInput';
import { formValidator, handleLogin } from '../../helpers/helperFunctions';
import { Button } from '@mui/material';
import { signUpUser } from '../../api/user';
import { loadUser } from '../../redux/user';

const SignUp = ({ handleType }) => {
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const [formError, setFormError] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [signUpError, setSignUpError] = useState('');
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

		const result = await signUpUser(form);
		const { status, message, response } = result;
		if (status < 400 && response) {
			console.log({response})
			const data = { ...response, loggedIn: true };
			handleLogin(data);
			dispatch(loadUser(data));
			navigate('/');
		} else {
			handleSignUpError(message);
		}
		setSubmitting(false);
		setFormError({});
	};

	const handleSignUpError = (message) => {
		setSignUpError(message);
		setTimeout(() => {
			setSignUpError('');
		}, 4000);
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className='auth-form shadow-md p-4 border rounded-lg mx-auto'
			>
				<p className='text-center text-4xl font-semibold mb-5'>Sign Up</p>
				<CustomInput
					name='firstName'
					changeFunction={handleChange}
					placeholder='First Name'
					className=''
					label='First Name'
					value={form.firstName}
					max={30}
					invalid={formError?.firstName?.length > 0}
				/>
				{formError.firstName && (
					<p className='text-sm text-red-700'>{formError.firstName}</p>
				)}
				<CustomInput
					name='lastName'
					changeFunction={handleChange}
					placeholder='Last Name'
					className=''
					label='Last Name'
					value={form.lastName}
					max={30}
					invalid={formError?.lastName?.length > 0}
				/>
				{formError.lastName && (
					<p className='text-sm text-red-700'>{formError.lastName}</p>
				)}
				<CustomInput
					changeFunction={handleChange}
					placeholder='Email'
					className=''
					label='Email'
					type='text'
					name='email'
					value={form.email}
					invalid={formError?.email?.error}
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
					invalid={formError?.password?.error}
				/>
				{formError.password && (
					<p className='text-sm text-red-700'>{formError.password}</p>
				)}
				{signUpError && <p className='text-sm text-red-700'>{signUpError}</p>}
				<Button
					fullWidth
					sx={{ marginTop: '20px' }}
					type='submit'
					color='primary'
					variant='contained'
					disabled={submitting}
				>
					Sign Up
				</Button>
			</form>
			<p className='text-center my-3'>
				Have an account?{' '}
				<span
					className='text-blue-700 font-semibold ml-1 cursor-pointer'
					onClick={() => handleType('Login')}
				>
					Login
				</span>
			</p>
		</div>
	);
};

export default SignUp;
