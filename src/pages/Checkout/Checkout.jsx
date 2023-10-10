import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Wrapper from '../../components/Wrapper';
import PayNow from './PayNow';
import { CURRENCIES } from '../../helpers/constants';
import { createPaymentIntent } from '../../api/stripe';
import { useStoreHook } from '../../hooks';

const Checkout = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [enablePay, setEnablePay] = useState(false);
	const [orderTotal, setOrderTotal] = useState(0);
	const [clientSecret, setClientSecret] = useState(null);
	const {checkoutCart, courses, user } = useStoreHook();
	const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
	const cartQuantity = checkoutCart.length;

	useEffect(() => {
		let total = 0;
		checkoutCart.forEach((id) => {
			const item = courses.find((c) => c._id === id);
			if (item) {
				total += item.price;
			}
		});
		setEnablePay(total > 0);
		setOrderTotal(total.toFixed(2));
	}, [checkoutCart, courses]);

	useEffect(() => {
		setIsLoading(true);
		if (orderTotal > 0) {
			const getIntentKey = async () => {
				const requestBody = {
					currency: CURRENCIES.CANADIAN,
					amount: orderTotal.replace('.', ''),
					userId: user._id,
					customer: `${user.firstName} ${user.lastName}`,
					email: user.email,
					cart: checkoutCart,
				};
				const result = await createPaymentIntent(requestBody);
				const { status, message, response } = result;
				if (status < 400) {
					setClientSecret(response.clientSecret);
				} else {
					console.log({ message });
				}
				setIsLoading(false);
			};
			getIntentKey();
		} else {
			setIsLoading(false);
		}
	}, [orderTotal, checkoutCart, user]);

	const showElements = stripePublishableKey && clientSecret;
	const showNoConnection = !showElements && !isLoading;
	return (
		<div className='full-height grid place-items-center'>
			{showElements ? (
				<div>
					<div className='p-4 border rounded-md bg-blue-100 mb-4'>
						<p><span className='font-medium'>Test Card:</span> 4242 4242 4242 4242</p>
						<p><span className='font-medium'>Expiration:</span> 04/24</p>
						<p><span className='font-medium'>CVC:</span> 424</p>
					</div>

					<Elements
						stripe={loadStripe(stripePublishableKey)}
						options={{ clientSecret }}
					>
						<PayNow
							enablePay={enablePay}
							cartQuantity={cartQuantity}
							orderTotal={orderTotal}
						/>
					</Elements>
				</div>
			) : null}
			{showNoConnection ? (
				<div className='text-center text-xl -mt-20'>
					<p className='font-semibold text-2xl'>
						There's an issue connecting with the payment provider.
					</p>
					<p>
						Please enjoy another page for now, and try to checkout again later.
					</p>
					<p>
						If this persists for long period, please contact our{' '}
						<NavLink to='/contact' className='text-blue-700'>
							{' '}
							support team
						</NavLink>
						.
					</p>
				</div>
			) : null}
		</div>
	);
};

export default Wrapper(Checkout);
