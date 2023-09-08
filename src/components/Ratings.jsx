import React from 'react';
import { Rating } from '@mui/material';

const Ratings = ({ rating, ratingAmount, textColor }) => {
	return (
		<div className={`flex items-center gap-1 mt-1 text-${textColor || 'black'}`}>
			<span className='font-medium'>{rating}</span>
			<Rating value={rating} precision={0.5} size='small' readOnly />
			<span className='text-sm'>({ratingAmount.toLocaleString()})</span>
		</div>
	);
};

export default Ratings;
