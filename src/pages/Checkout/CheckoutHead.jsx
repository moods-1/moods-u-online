import React from 'react';

const CheckoutHead = ({ cartQuantity }) => {
	return (
		<div className='mb-16'>
			<p className='page-subtitle'>Checkout Courses ({cartQuantity})</p>
			<p className='mt-[-20px] text-sm'>
				Once your order has been processed, your courses will appear on the
				enrolled classes page.
			</p>
		</div>
	);
};

export default CheckoutHead;
