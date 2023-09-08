import React from 'react';

const DetailsTop = ({ title, subtitle, description }) => {
	return (
		<>
			<p className='text-2xl sm:text-4xl font-semibold'>{title}</p>
			<p className='text-lg sm:text-xl font-medium'>{subtitle}</p>
			<p className='sm:text-xl font-semibold mt-4 mb-1'>Course Description</p>
			<p className='mb-2'>{description}</p>
		</>
	);
};

export default DetailsTop;
