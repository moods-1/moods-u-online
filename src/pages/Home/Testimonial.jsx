import React from 'react';

const Testimonial = ({ _id: id, image, lastName, firstName, testimonial }) => {
	const name = `${firstName} ${lastName}`;
	return (
		<div
			key={id}
			className='bg-black text-white max-w-[280px] min-h-[340px] py-5 px-6 rounded-lg mb-6'
		>
			<img
				src={image}
				alt={name}
				className='h-20 w-20 rounded-full mx-auto mb-2'
			/>
			<p className='text-center text-xl font-semibold mb-2'>{name}</p>
			<p>{testimonial}</p>
		</div>
	);
};

export default Testimonial;
