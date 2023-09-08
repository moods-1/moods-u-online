import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { LostMan } from '../assets';

const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<div className='w-full min-h-screen p-5 grid place-items-center text-white text-center text-lg bg-black'>
			<div>
				<p className='text-4xl font-semibold'>You appear to be lost.</p>
				<img
					src={LostMan}
					alt='lost man'
					width='100%'
					className='my-5 max-w-sm mx-auto'
				/>
				<p className='mb-12'> Let's get you back on track.</p>
				<Button
					className='mt-5 w-40'
					variant='contained'
					color='primary'
					onClick={() => {
						navigate('/');
					}}
				>
					Home
				</Button>
			</div>
		</div>
	);
};

export default ErrorPage;
