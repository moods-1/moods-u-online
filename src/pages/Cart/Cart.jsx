import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Wrapper from '../../components/Wrapper';
import { removeFromCart } from '../../redux/user';
import { EmptyCart } from '../../assets';
import CustomSlider from '../../components/CustomSlider';
import CourseCard from '../../components/CourseCard';
import CartTop from './CartTop';
import CartItem from './CartItem';

const Cart = () => {
	const { courses } = useSelector((state) => state.course);
	const { cart } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [localCartObject, setLocalCartObject] = useState({});
	const [cartCourses, setCartCourses] = useState([]);
	const [subtotal, setSubtotal] = useState(0);
	const cartItems = Object.keys(localCartObject).length;
	const showCheckout = Object.keys(localCartObject).length > 0;

	useEffect(() => {
		const cartItems = [];
		const cartObject = {};
		cart.forEach((id) => {
			const item = courses.find((c) => c._id === id);
			if (item) {
				cartItems.push(item);
				cartObject[id] = item;
			}
		});
		setCartCourses([...cartItems]);
		setLocalCartObject({ ...cartObject });
	}, [cart, courses]);

	useEffect(() => {
		let total = 0;
		Object.values(localCartObject).forEach((item) => {
			total += item.price;
		});

		setSubtotal(total.toFixed(2));
	}, [localCartObject]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleCheck = (id) => {
		const localCart = { ...localCartObject };
		if (id in localCart) {
			delete localCart[id];
		} else {
			localCart[id] = cartCourses.find((c) => c._id === id);
		}
		setLocalCartObject({ ...localCart });
	};

	const handleDelete = (id) => {
		dispatch(removeFromCart(id));
	};

	const sliderData = courses.map((course) => <CourseCard course={course} />);

	let title = '';
	if (cartItems) {
		title = `Checkout Courses (${cartItems})`;
	} else {
		title = cart.length ? 'You have no items selected.' : 'Your cart is empty.';
	}

	return (
		<div className='mb-5'>
			<CartTop title={title} subtotal={subtotal} />
			{cart.length ? (
				<div className='flex flex-col-reverse sm:flex-row gap-4'>
					<div className='flex flex-col gap-5 flex-1'>
						{cartCourses.map((course) => (
							<CartItem
								key={course._id}
								course={course}
								handleCheck={handleCheck}
								handleDelete={handleDelete}
								localCartObject={localCartObject}
							/>
						))}
					</div>
					<div className='w-full sm:w-40 text-left sm:text-center mb-10'>
						{showCheckout && (
							<NavLink to='/checkout'>
								<button className='bg-amber-500 text-white px-12 py-1 rounded-md w-full'>
									Checkout
								</button>
							</NavLink>
						)}
					</div>
				</div>
			) : (
				<img src={EmptyCart} alt='empty-cart' className='mx-auto w-80 mt-20' />
			)}
			<div>
				<p className='page-subtitle mt-20 mb-8'>Recommended Courses</p>
				<CustomSlider data={sliderData} />
			</div>
		</div>
	);
};

export default Wrapper(Cart);
