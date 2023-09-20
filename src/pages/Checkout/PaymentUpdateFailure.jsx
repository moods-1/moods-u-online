import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const PaymentUpdateFailure = () => {
	const { state } = useLocation();

	let type;
	if (state?.type) {
		type = state.type;
	}

	const body = (
		<div className='text-center'>
			<p className='text-2xl sm:text-4xl font-medium mb-4'>
				The payment process was successful!!!
			</p>
			{type ? (
				<p className='text-md sm:text-xl mb-2 text-red-600'>
					{type === 'order'
						? 'There was an error while trying to create your invoice.'
						: 'There was an error while trying to register your course(s).'}
				</p>
			) : (
				<p className='text-md sm:text-xl mb-2'>
					There was an error on our end while processing the transaction.
				</p>
			)}

			<p>
				We are truly sorry for this inconvienience. Please contact our{' '}
				<NavLink to='/contact' className='text-blue-600 font-medium'>
					{' '}
					support team
				</NavLink>{' '}
				to get this rectified.
			</p>
		</div>
	);

	return (
		<div className='min-h-[calc(100vh-110px)] p-4 grid place-items-center'>
			{body}
		</div>
	);
};

export default PaymentUpdateFailure;
