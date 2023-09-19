import React from 'react';

const EnrolledItem = ({ course, showPrice }) => {
	return (
		<div key={course._id} className='flex flex-wrap w-full gap-5 border-b pb-4'>
			<div className='w-full sm:h-40 sm:w-80'>
				<img
					src={course.image}
					alt={course.title}
					className='w-full h-[100%]'
				/>
			</div>
			<div className='max-w-md flex flex-col justify-between'>
				<div>
					<p className='text-2xl font-semibold'>{course.title}</p>
					<p className=''>{course.subtitle}</p>
				</div>
			</div>
		</div>
	);
};

export default EnrolledItem;
