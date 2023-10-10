import React from 'react';

import { BENEFITS } from '../../helpers/constants';

const Benefits = () => {
	return (
		<div className='section-3 min-h-[500px] '>
			{BENEFITS.map(({ largeValue, title, text, image }) => (
				<div key={title} className='flex max-w-[280px] p-2 mb-6'>
					<div className='text-black'>
						<img src={image} alt='icon' className='w-16 sm:w-20 mx-auto' />
						<p className='text-center text-blue-700 text-[50px] sm:text-[80px] font-bold '>
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
