import React, { useEffect, useState } from 'react';

import { getAllOrders } from '../../api/orders';
import Order from './Order';
import Wrapper from '../../components/Wrapper';
import { useStoreHook } from '../../hooks';

const Orders = () => {
	const [userOrders, setUserOrders] = useState([]);
	const [fullOrders, setFullOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { courses, user } = useStoreHook();

	useEffect(() => {
		if (user?.loggedIn) {
			setIsLoading(true);
			const { _id: userId } = user;
			const getOrders = async () => {
				const result = await getAllOrders(userId);
				const { status, message, response } = result;
				if (status < 400 && response) {
					setUserOrders([...response]);
				} else console.log({ message });
				setIsLoading(false);
			};
			getOrders();
		} else setUserOrders([]);
	}, [user]);

	useEffect(() => {
		if (userOrders.length) {
			const localOrders = [...userOrders];
			localOrders.forEach((order) => {
				const fullProducts = [];
				const { products } = order;
				products.forEach((productId) => {
					const item = courses.find((c) => c._id === productId);
					if (item) fullProducts.push(item);
				}, []);
				order.products = fullProducts;
			});
			setFullOrders([...localOrders]);
		} else setFullOrders([]);
		setIsLoading(false);
	}, [courses, user, userOrders]);

	const showEmptyImage = fullOrders.length < 1 && !isLoading;
	return (
		<div className='full-height'>
			<p className='page-subtitle mb-12'>Order History</p>
			{fullOrders.map((order) => (
				<Order key={order._id} order={order} />
			))}
			{showEmptyImage && (
						<p className='text-md sm:text-lg -mt-4 animate-fade-in'>
							You are either have not made any purchases, or we cannot locate
							your orders.
						</p>
					)}
		</div>
	);
};

export default Wrapper(Orders);
