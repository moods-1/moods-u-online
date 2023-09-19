import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';

import { updateUserPostCheckout } from '../../redux/user';
import CustomLoader from '../../components/CustomLoader';
import { registerPayment } from '../../api/stripe';
import { PartyPopper } from '../../assets';

const queryParameters = new URLSearchParams(window.location.search);
const intent = queryParameters.get('payment_intent');

const Success = () => {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	useEffect(() => {
		const getComplete = async () => {
			const requestbody = { intent };
			const result = await registerPayment(requestbody);
			const { status, message, response } = result;
			if (status < 400 && response) {
				if ('email' in response) {
					dispatch(updateUserPostCheckout(response));
					navigate('/enrolled-courses');
				}
			} else {
				console.log({ message });
			}
			setIsLoading(false);
		};
		getComplete();
		return () => {};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const body = (
		<div className='text-center'>
			<img
				src={PartyPopper}
				className='w-28 h-28 sm:w-40 sm:h-40 mx-auto mb-6 -mt-40'
				alt='celebration'
			/>
			<p className='text-2xl sm:text-4xl font-medium mb-4'>
				The payment process was successful!!!
			</p>
			<p className='text-md sm:text-xl mb-2'>
				{isLoading
					? 'Please wait while we register your new course(s).'
					: 'There was an error while trying to register your course(s).'}
			</p>

			{isLoading ? (
				<div className='mt-10'>
					<CustomLoader />
				</div>
			) : (
				<p>
					We are truly sorry for this inconvienience. Please contact our{' '}
					<NavLink to='/contact' className='text-blue-600 font-medium'>
						{' '}
						support team
					</NavLink>{' '}
					to get this rectified.
				</p>
			)}
		</div>
	);

	return (
		<div className='min-h-[calc(100vh-110px)] p-4 grid place-items-center'>
			{body}
		</div>
	);
};

export default Success;
