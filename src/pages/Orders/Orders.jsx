import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getAllOrders } from '../../api/orders';
import Order from './Order';
import Wrapper from '../../components/Wrapper';

const Orders = () => {
	const [userOrders, setUserOrders] = useState([]);
	const [fullOrders, setFullOrders] = useState([]);
	const { courses } = useSelector((state) => state.course);
	const { user } = useSelector((state) => state.user);

	useEffect(() => {
		if (user?.loggedIn) {
			const { _id: userId } = user;
			const getOrders = async () => {
				const result = await getAllOrders(userId);
				const { status, message, response } = result;
				if (status < 400 && response) {
					setUserOrders([...response]);
				} else console.log({ message });
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
	}, [courses, user, userOrders]);

	return (
		<div className='full-height'>
			<p className='page-subtitle mb-12'>Order History</p>
			{fullOrders.map((order) => (
				<Order key={order._id} order={order} />
			))}
		</div>
	);
};

export default Wrapper(Orders);
