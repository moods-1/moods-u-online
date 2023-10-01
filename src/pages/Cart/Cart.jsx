import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Wrapper from '../../components/Wrapper';
import { removeFromCart, loadUser } from '../../redux/user';
import { EmptyCart } from '../../assets';
import CustomSlider from '../../components/CustomSlider';
import CourseCard from '../../components/CourseCard';
import CartTop from './CartTop';
import CartItem from './CartItem';
import {
	getStoredUser,
	handleLogin,
	setLocalStorage,
	updateStorageCart,
} from '../../helpers/helperFunctions';
import { updateCart } from '../../api/user';
import OrderSummary from './OrderSummary';
import DuplicationModal from '../../components/modals/DuplicationModal';

const Cart = () => {
	const { courses } = useSelector((state) => state.course);
	const { cart, user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [showLoginMessage, setShowLoginMessage] = useState(false);
	const [localCartObject, setLocalCartObject] = useState({});
	const [cartCourses, setCartCourses] = useState([]);
	const [subtotal, setSubtotal] = useState(0);
	const [showDuplicationModal, setShowDuplicationModal] = useState(false);
	const [duplicateCourses, setDuplicateCourses] = useState([]);
	const navigate = useNavigate();
	const cartItems = Object.keys(localCartObject).length;
	const showCheckout = Object.keys(localCartObject).length > 0;
	const loggedIn = user?.loggedIn;

	const handleDuplicationModalClose = () => {
		setShowDuplicationModal((prev) => !prev);
	};

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

	const handleDelete = async (id) => {
		const type = 'remove';
		updateStorageCart(id, type);
		dispatch(removeFromCart(id));
		if (loggedIn) {
			const result = await updateCart({ userId: user?._id, itemId: id, type });
			const { status, message, response } = result;
			if (status < 400 && response) {
				dispatch(loadUser({ ...response, loggedIn: true }));
				handleLogin(response);
			} else {
				console.log({ message });
			}
		} else {
			const storedUser = getStoredUser();
			if (storedUser) {
				const { cart } = storedUser;
				const editedCart = cart.filter((c) => c._id !== id);
				storedUser.cart = editedCart;
				setLocalStorage('user', JSON.stringify(storedUser));
			}
		}
	};

	const handleCheckout = () => {
		const enrolledSet = new Set([...user?.enrolledCourses]);
		const cartDuplicates = [];
		cart.forEach((item) => {
			if (enrolledSet.has(item)) cartDuplicates.push(item);
		});
		if (cartDuplicates.length) {
			console.log('Already in enrolled courses...');
			setDuplicateCourses([...cartDuplicates]);
			setShowDuplicationModal(true);
		} else {
			navigate('/checkout');
		}
	};

	const handleLoginMessage = () => {
		setShowLoginMessage(!loggedIn);
	};

	const sliderData = courses.map((course) => <CourseCard course={course} />);

	let title = '';
	if (cartItems) {
		title = 'Shopping Cart';
	} else {
		title = cart.length ? 'You have no items selected.' : 'Your cart is empty.';
	}

	return (
		<div className='mb-5'>
			<CartTop title={title} cartItems={cartItems} />
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
					<OrderSummary
						cartItems={cartItems}
						subtotal={subtotal}
						showCheckout={showCheckout}
						handleLoginMessage={handleLoginMessage}
						handleCheckout={handleCheckout}
						showLoginMessage={showLoginMessage}
						loggedIn={loggedIn}
						handleMouseLeave={() => setShowLoginMessage(false)}
					/>
				</div>
			) : (
				<img src={EmptyCart} alt='empty-cart' className='mx-auto w-80 mt-20' />
			)}
			<div>
				<p className='page-subtitle mt-20 mb-8'>Recommended Courses</p>
				<CustomSlider data={sliderData} />
			</div>
			{showDuplicationModal && (
				<DuplicationModal
					open={showDuplicationModal}
					onClose={handleDuplicationModalClose}
					duplicates={duplicateCourses}
				/>
			)}
		</div>
	);
};

export default Wrapper(Cart);
