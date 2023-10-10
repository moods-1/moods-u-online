import React from 'react';

import Testimonial from './Testimonial';
import { TESTIMONIALS } from '../../helpers/constants';

const Testimonials = () => {
	return (
		<div className='w-full mb-10 text-white px-4 py-16 min-h-[468px]'>
			<div className='flex flex-wrap w-full justify-around gap-10 min-h-[340px]'>
				{TESTIMONIALS.map((item) => (
					<Testimonial key={item._id} {...item} />
				))}
			</div>
		</div>
	);
};

export default Testimonials;
