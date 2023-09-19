import React from 'react';
import { Button } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { getStoredUser } from '../../helpers/helperFunctions';
import Wrapper from '../../components/Wrapper';

const Success = () => {
	const { firstName } = getStoredUser();
	const navigate = useNavigate();
	const prefix = firstName ? `${firstName}, the` : 'The';

	const handleButton = () => {
		navigate('/enrolled-courses');
	};

	return (
		<div className='full-height'>
			<p className='text-md sm:text-lg font-medium mb-2 items-center'>
				<CheckCircle color='success' className='-mt-1 mr-2' />
				{prefix} payment process was successful!{' '}
			</p>
			<p className='mb-4'>
				Thank you for your purchase. Your invoice should have been downloaded.
			</p>
			<Button
				color='primary'
				variant='contained'
				size='small'
				onClick={handleButton}
			>
				Enrolled Courses
			</Button>
		</div>
	);
};

export default Wrapper(Success);
