import React from 'react';
import { useNavigate } from 'react-router-dom';

import Ratings from '../../components/Ratings';

const HouseCourseCard = ({ course }) => {
	const { _id, title, image, rating, ratingAmount } = course;
	const navigate = useNavigate();

	const handleDetails = () => {
		navigate(`/details/${_id}`);
	};

	return (
		<div
			className='w-[240px] min-h-[300px] flex-shrink-0 overflow-hidden relative cursor-pointer'
			onClick={handleDetails}
		>
			<div className='w-full h-[150px] mx-auto mb-4 '>
				<img src={image} className='w-full h-[100%]' alt={title} />
			</div>
			<div className='p-2'>
				<p className='font-semibold'>{title}</p>
				<Ratings rating={rating} ratingAmount={ratingAmount} />
			</div>
		</div>
	);
};

export default HouseCourseCard;
