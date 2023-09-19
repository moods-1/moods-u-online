import React from 'react';

const OrderLine = ({ span1, span2 }) => {
	return (
		<p className='text-[13px] font-semibold flex justify-between mb-3'>
			<span>{span1}</span>
			<span>${span2}</span>
		</p>
	);
};

const OrderSummary = ({
	cartItems,
	subtotal,
	showCheckout,
	handleLoginMessage,
	handleCheckout,
	showLoginMessage,
	loggedIn,
	handleMouseLeave,
}) => {
	return (
		<div className='w-full sm:w-64 text-left bg-blue-100 p-6 mb-6 sm:mb-0'>
			<p className='text-lg font-bold mb-4'>Order Summary</p>
			<OrderLine span1={`ITEMS ${cartItems}`} span2={subtotal} />
			<OrderLine span1={'TOTAL COST'} span2={subtotal} />
			{showCheckout && (
				<div
					className='w-full relative mt-6'
					onMouseOver={handleLoginMessage}
					onMouseLeave={handleMouseLeave}
				>
					<button
						className='bg-blue-700 text-white px-12 py-1 w-full'
						onClick={handleCheckout}
						disabled={!loggedIn}
					>
						Checkout
					</button>
					{showLoginMessage && (
						<div className='border rounded-md p-2 text-red-600 text-sm mt-1'>
							You must logged in to checkout.
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default OrderSummary;
