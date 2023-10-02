import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';

import { registerPayment } from '../../api/stripe';
import { getInvoice } from '../../api/invoices';
import { updateUserPostCheckout } from '../../redux/user';

const PlaceOrder = ({ enablePay, cartQuantity, orderTotal }) => {
	const [submitting, setSubmitting] = useState(false);
	const [dbUpdateFailure, setDbUpdateFailure] = useState(false);
	const [failureType, setFailureType] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const stripe = useStripe();
	const elements = useElements();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleCheckout = async () => {
		setSubmitting(true);
		const handleErrorMessage = (message) => {
			setErrorMessage(message);
			setTimeout(() => {
				setErrorMessage('');
			}, 4000);
			setSubmitting(false);
		};
		if (!stripe || !elements) return;

		//Make payment
		const result = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/success`,
			},
			redirect: 'if_required',
		});

		// Handle stripe responses
		if (result.error) {
			const { error } = result;
			handleErrorMessage(error.message);
		} else if (result.paymentIntent) {
			const { id } = result.paymentIntent;
			if (id) {
				// Update the user and create an order in the database
				const result = await registerPayment({ intent: id });
				const { status, message, response } = result;
				const { user, order } = response;
				if (status < 400 && user) {
					if ('userId' in order) {
						const { orderId } = order;
						await getInvoice(orderId);
					}
					if ('email' in user) {
						dispatch(updateUserPostCheckout(user));
						setSubmitting(false);
						navigate('/success');
					}
				} else {
					setFailureType(message.includes('Order') ? 'order' : 'user');
					setDbUpdateFailure(true);
				}
			}
		}
	};

	return (
		<>
			{dbUpdateFailure ? (
				<Navigate to='/failure' state={{ type: failureType }} replace={true} />
			) : (
				<div className='w-full max-w-sm sm:w-[400px] text-left sm:text-center mb-10 border rounded-md p-5'>
					<PaymentElement />
					<div className='py-4'>
						<button
							className='bg-blue-700 disabled:bg-slate-300 text-white px-3 py-2 rounded-md w-full my-2'
							disabled={!enablePay || submitting}
							onClick={handleCheckout}
						>
							{submitting ? 'Processing' : 'Pay Now'}
						</button>
						{errorMessage && (
							<p className='text-red-700 text-md text-left'>{errorMessage}</p>
						)}
						<hr className='my-4' />
						<p className='text-lg text-left font-semibold mb-5'>
							Order Summary
						</p>
						<p className='flex justify-between'>
							<span className='checkout-label'>Courses({cartQuantity}):</span>
							<span>${orderTotal}</span>
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default PlaceOrder;
