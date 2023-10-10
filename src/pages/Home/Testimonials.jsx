import React from 'react';

import Testimonial from './Testimonial';
import { TESTIMONIALS } from '../../helpers/constants';

const Testimonials = () => {
	return (
		<div className='w-full mb-10 text-white py-16 min-h-[468px]'>
			<div className='section-3 min-h-[340px]'>
				{TESTIMONIALS.map((item) => (
					<Testimonial key={item._id} {...item} />
				))}
			</div>
		</div>
	);
};

export default Testimonials;
