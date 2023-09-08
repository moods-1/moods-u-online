import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { LogoDark } from '../../assets';
import SignUp from './SignUp';
import Login from './Login';

const Auth = () => {
	const [authType, setAuthType] = useState('Login');
	const { enqueueSnackbar } = useSnackbar();

	const handleType = (type) => {
		setAuthType(type);
	};

	const Snack = (message, type, duration) => {
		return enqueueSnackbar(message, {
			variant: type,
			autoHideDuration: duration,
		});
	};

	return (
		<div className='grid place-items-center min-h-screen p-4 w-full'>
			<div className='w-full'>
				<NavLink to='/'>
					<img src={LogoDark} className='w-40 mx-auto mb-10' alt='logo' />
				</NavLink>
				{authType === 'Login' ? (
					<Login handleType={handleType} snack={Snack} />
				) : (
					<SignUp handleType={handleType} snack={Snack} />
				)}
			</div>
		</div>
	);
};

export default Auth;
