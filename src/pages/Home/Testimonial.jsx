import React from 'react';

const Testimonial = ({ _id: id, image, lastName, firstName, testimonial }) => {
	const name = `${firstName} ${lastName}`;
	return (
		<div
			key={id}
			className='w-64 min-h-[340px] p-4 rounded-lg shadow-slate-400 shadow-sm'
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
