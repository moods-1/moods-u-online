import React from 'react';

import HorizontalLoader from '../../components/HorizontalLoader';

const Testimonial = ({
	_id: id,
	image,
	lastName,
	firstName,
	testimonial,
	isLoading,
}) => {
	const name = `${firstName} ${lastName}`;
	return (
		<div
			key={id}
			className='bg-black text-white w-64 min-h-[340px] p-4 rounded-lg'
		>
			{isLoading ? (
				<HorizontalLoader height='300px' />
			) : (
				<>
					<img
						src={image}
						alt={name}
						className='h-20 w-20 rounded-full mx-auto mb-2'
					/>
					<p className='text-center text-xl font-semibold mb-2'>{name}</p>
					<p>{testimonial}</p>
				</>
			)}
		</div>
	);
};

export default Testimonial;
