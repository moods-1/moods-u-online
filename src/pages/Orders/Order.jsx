import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment-timezone';

import { getInvoice } from '../../api/invoices';

const Order = ({ order }) => {
	const { products, createdAt, orderTotal, orderId } = order;
	const orderDate = moment(createdAt).format('DD-MMM-YYYY');

	const downloadInvoice = async () => {
		await getInvoice(orderId);
	};

	return (
		<div className='w-full border-b m:flex-row justify-between min-h-[200px] mb-6'>
			<div className='flex justify-between items-center flex-wrap gap-4 bg-slate-300 w-full p-4'>
				<div className=' sm:min-w-[320px] '>
					<p>
						<span className='font-semibold'>Order Id: </span>
						{orderId}
					</p>
					<p>
						<span className='font-semibold'>Date: </span> {orderDate}
					</p>
					<p>
						<span className='font-semibold'>Total: </span> ${orderTotal}
					</p>
				</div>
				<button
					className='px-6 py-1 bg-slate-600 text-white rounded-md'
					onClick={downloadInvoice}
				>
					Invoice
				</button>
			</div>

			<div className='flex flex-wrap gap-4 py-4'>
				{products?.map((product) => (
					<div key={product._id} className='my-4 flex flex-wrap gap-5'>
						<img
							src={product.image}
							alt={product.title}
							className='w-30 h-20'
						/>
						<div className='flex-1'>
							<p className='font-semibold min-w-[240px]'>{product.title}</p>
							<p>${product.price}</p>
							<NavLink
								to={`/details/${product._id}`}
								className='text-blue-700 font-medium'
							>
								Details
							</NavLink>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Order;
