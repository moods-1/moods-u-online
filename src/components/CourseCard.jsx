import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart } from '../redux/user';
import Ratings from './Ratings';
import { updateCart } from '../api/user';
import { updateStorageCart, getLoggedIn } from '../helpers/helperFunctions';

const CourseCard = ({ course }) => {
	const [userId, setUserId] = useState('');
	const { _id, title, image, price, rating, ratingAmount } = course;
	const { cart, user } = useSelector((state) => state.user);
	const cartSet = new Set([...cart]);
	const inCart = cartSet.has(_id);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loggedIn = getLoggedIn();

	const handleAddToCart = async () => {
		const itemId = _id;
		const type = 'add';
		updateStorageCart(itemId, type);
		if (loggedIn) {
			await updateCart({ userId, itemId, type });
		}
		dispatch(addToCart(_id));
	};

	const handleRemoveFromCart = async () => {
		const itemId = _id;
		const type = 'remove';
		updateStorageCart(itemId, type);
		if (loggedIn) {
			await updateCart({ userId, itemId, type });
		}
		dispatch(removeFromCart(_id));
	};

	const handleDetails = () => {
		navigate(`/details/${_id}`);
	};

	useEffect(() => {
		setUserId(user._id ? user._id : '');
	}, [user]);

	return (
		<div className='w-[240px] min-h-[300px] flex-shrink-0 overflow-hidden relative'>
			<div
				className='w-full h-[150px] mx-auto mb-4 cursor-pointer'
				onClick={handleDetails}
			>
				<img src={image} className='w-full h-[100%]' alt={title} />
			</div>
			<div className='p-2'>
				<p className='font-semibold'>{title}</p>
				<Ratings rating={rating} ratingAmount={ratingAmount} />
				<div className='flex justify-between gap-4 my-2 text-sm font-medium'>
					<p
						className={`flex-1 cursor-pointer ${
							inCart ? 'text-red-600' : 'text-blue-700'
						}`}
						onClick={inCart ? handleRemoveFromCart : handleAddToCart}
					>
						{inCart ? 'REMOVE' : 'ADD TO CART'}
					</p>
					<p
						className='flex-1 cursor-pointer text-right text-blue-700'
						onClick={handleDetails}
					>
						DETAILS
					</p>
				</div>
				<p className='w-full font-semibold text-xl'>CAD ${price}</p>
			</div>
		</div>
	);
};

export default CourseCard;
