import React from 'react';

const CheckoutItem = ({ course, showPrice }) => {
	return (
		<div key={course._id} className='flex flex-wrap gap-5 border-b pb-4'>
			<div className='flex w-80 h-50'>
				<div className='h-30 sm:h-40 w-50 sm:w-80'>
					<img
						src={course.image}
						alt={course.title}
						className='w-full h-[100%]'
					/>
				</div>
			</div>
			<div className='max-w-xl flex flex-col justify-between'>
				<div>
					<p className='text-2xl font-semibold'>{course.title}</p>
					<p className=''>{course.subtitle}</p>
				</div>
			</div>
		</div>
	);
};

export default CheckoutItem;
