import React from 'react';

import { BENEFITS } from '../../helpers/constants';

const Benefits = () => {
	return (
		<div className='flex flex-wrap justify-around w-full min-h-[500px] p-12 pb-4 gap-x-4'>
			{BENEFITS.map(({ largeValue, title, text, image }) => (
				<div key={title} className='flex min-w-[240px] max-w-[300px] p-4 mb-12'>
					<div className='text-black'>
						<img src={image} alt='icon' className='w-16 sm:w-24 mx-auto' />
						<p className='text-center text-blue-700 text-[50px] sm:text-[80px] font-bold sm:min-w-[280px]'>
							{largeValue}
						</p>
						<p className='text-md sm:text-lg font-semibold mb-2'>{title}</p>
						<p>{text}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default Benefits;
