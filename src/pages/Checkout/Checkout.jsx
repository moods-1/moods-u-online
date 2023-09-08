import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Wrapper from '../../components/Wrapper';
import CheckoutItem from './CheckoutItem';
import { checkout } from '../../api/user';
import { updateUserPostCheckout } from '../../redux/user';
import { handleLogin, setLocalStorage } from '../../helpers/helperFunctions';

const Checkout = () => {
  const [enablePlaceOrder, setEnablePlaceOrder] = useState(false);
  const [cartCourses, setCartCourses] = useState([]);
	const [orderTotal, setOrderTotal] = useState(0);
	const { cart, user } = useSelector((state) => state.user);
  const { courses } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
	const cartQuantity = cart.length;

	useEffect(() => {
    let total = 0;
    const cartItems = [];
		cart.forEach((id) => {
			const item = courses.find((c) => c._id === id);
      if (item) {
        cartItems.push(item);
				total += item.price;
			}
		});
		setEnablePlaceOrder(total > 0);
    setOrderTotal(total.toFixed(2));
    setCartCourses([...cartItems]);
  }, [cart, courses]);
  
  const handleCheckout = async () => {
    setEnablePlaceOrder(false);
    const { _id: id } = user;
    const requestBody = { id, cart };
    const result = await checkout(requestBody);
    const { status, message, response } = result;
    if (status < 400) {
      setLocalStorage('user', JSON.stringify(response));
      dispatch(updateUserPostCheckout(response));
      navigate('/enrolled-courses');
    } else {
      console.log({ message })
      setEnablePlaceOrder(true);
    }
}

	return (
		<div className='min-h-[calc(100vh-110px)]'>
			<div className='mb-16'>
				<p className='page-subtitle'>Checkout Courses ({cartQuantity})</p>
				<p className='mt-[-20px] text-sm'>
					Once your order has been processed, your courses will appear
					on the enrolled classes page.
				</p>
			</div>
			<div className='flex flex-col-reverse sm:flex-row gap-4'>
        <div className='flex flex-col gap-5 flex-1 mb-12'>
        {cartCourses.map((course) => (
							<CheckoutItem
								key={course._id}
								course={course}
							/>
						))}
        </div>
				<div className='w-full sm:w-[260px] min-w-[250px] h-44 text-left sm:text-center mb-10 border rounded-md'>
					<div className='p-4'>
						<button
							className='bg-amber-500 disabled:bg-slate-300 text-white px-3 py-1 rounded-md w-full'
              disabled={!enablePlaceOrder}
              onClick={handleCheckout}
						>
							Place your order
						</button>
						<hr className='my-4' />
						<p className='text-lg text-left font-semibold mb-5'>
							Order Summary
						</p>
						<p className='flex justify-between'>
							<span className='checkout-label'>Courses({cartQuantity}):</span>
							<span>${orderTotal}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Wrapper(Checkout);
