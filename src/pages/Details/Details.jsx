import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';

import Wrapper from '../../components/Wrapper';
import Prerequisites from './Prerequisites';
import { addToCart, removeFromCart } from '../../redux/user';
import Ratings from '../../components/Ratings';
import FineDetails from './FineDetails';
import DetailsTop from './DetailsTop';
import Slider from '../../components/CustomSlider';
import CourseCard from '../../components/CourseCard';
import { updateStorageCart } from '../../helpers/helperFunctions';
import { updateCart } from '../../api/user';
import { useStoreHook } from '../../redux';

const Details = () => {
	const { id } = useParams();
	const [course, setCourse] = useState({});
	const [sliderCourses, setSliderCourses] = useState([]);
	const { cart, courses, user } = useStoreHook();
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const cartSet = new Set([...cart]);
	const inCart = cartSet.has(id);
	const loggedIn = user?.loggedIn;

	const snack = (message, type, duration) => {
		return enqueueSnackbar(message, {
			variant: type,
			autoHideDuration: duration,
		});
	};
	
	const handleAddToCart = async () => {
		const enrolledSet = new Set([...user?.enrolledCourses]);
		if (enrolledSet.has(id)) {
			snack('You are already enrolled in this course.', 'info', 4000);
		} else {
			const itemId = id;
			const type = 'add';
			updateStorageCart(itemId, type);
			if (loggedIn) {
				const userId = user?._id;
				await updateCart({ userId, itemId, type });
			}
			dispatch(addToCart(id));
		}
	};

	const handleRemoveFromCart = async () => {
		const itemId = id;
		const type = 'remove';
		updateStorageCart(itemId, type);
		if (loggedIn) {
			const userId = user?._id;
			await updateCart({ userId, itemId, type });
		}
		dispatch(removeFromCart(id));
	};

	const sliderData = sliderCourses.map((course) => <CourseCard course={course} />);

	useEffect(() => {
		if (courses) {
			const localCourse = courses.find((c) => c._id === id);
			setCourse(localCourse || {});
			setSliderCourses(courses.filter((c) => c._id !== id));
		}
	}, [courses, id]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			{Object.keys(course).length ? (
				<div className='w-full mb-4'>
					<div className='flex flex-col-reverse lg:flex-row w-full mx-auto bg-black min-h-96 text-white gap-5 select-none'>
						<div className='flex-1 p-8'>
							<DetailsTop {...course} />
							<Ratings
								rating={course.rating}
								ratingAmount={course.ratingAmount}
								textColor='white'
							/>
							<FineDetails {...course} />
							<Prerequisites prerequisites={course.prerequisites} />
							<div>
								<Button
									variant='contained'
									color={inCart ? 'error' : 'primary'}
									size='small'
									sx={{ minWidth: '170px' }}
									onClick={inCart ? handleRemoveFromCart : handleAddToCart}
								>
									{inCart
										? 'Remove from cart'
										: `Purchase $${course.price} CAD`}
								</Button>
							</div>
						</div>
						<div className='flex-1 m-0 lg:m-8'>
							<img src={course.image} alt={course.title} />
						</div>
					</div>
					<div className='w-full my-12'>
						<p className='page-subtitle'>You may also like</p>
					<Slider data={sliderData} />
					</div>
					
				</div>
			) : (
				<div />
			)}
		</>
	);
};

export default Wrapper(Details);
