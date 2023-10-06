import React, { useState, useEffect } from 'react';

import { getTestimonials } from '../../api/testimonials';
import Testimonial from './Testimonial';
import { TESTIMONIALS_PLACEHOLDER } from '../../helpers/constants';

const Testimonials = () => {
	const [testimonials, setTestimonials] = useState([
		...TESTIMONIALS_PLACEHOLDER,
	]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			const result = await getTestimonials(3);
			const { status, response } = result;
			if (status < 400) {
				setTestimonials(response);
			}
			setIsLoading(false);
		};
		fetchData();
	}, []);

	const showNothing = !isLoading && testimonials.length < 1;

	return (
		<>
			{showNothing ? null : (
				<div className='w-full mb-10 text-white px-4 py-16 min-h-[468px]'>
					<div className='flex flex-wrap w-full justify-around gap-10 min-h-[340px]'>
						{testimonials.map((item) => (
							<Testimonial key={item._id} {...item} isLoading={isLoading} />
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default Testimonials;
