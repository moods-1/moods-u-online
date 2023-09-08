import React from 'react';

const CartTop = ({ title, subtotal }) => {
	return (
		<div className='flex flex-wrap justify-between items-center gap-5 mb-16'>
			<p className='page-subtitle'>{title}</p>
			<p className='page-subtitle text-xl'>
				<span className='font-semibold'>Subtotal: </span>${subtotal}
			</p>
		</div>
	);
};

export default CartTop;
