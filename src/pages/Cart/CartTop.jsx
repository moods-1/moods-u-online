import React from 'react';

import { suffixSetter } from '../../helpers/helperFunctions';

const CartTop = ({ title, cartItems }) => {
	const items = suffixSetter(cartItems, 'Item');

	return (
		<div className='flex flex-wrap justify-between items-center gap-5 mb-8'>
			<p className='page-subtitle'>{title}</p>
			{cartItems ? (
				<p className='page-subtitle text-xl'>
					{cartItems} {items}
				</p>
			) : null}
		</div>
	);
};

export default CartTop;
