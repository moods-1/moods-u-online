import React from 'react';
import { Checkbox, Button } from '@mui/material';

const CartItem = ({ course, handleCheck, handleDelete, localCartObject }) => {
	return (
		<div key={course._id} className='flex flex-wrap gap-5 border-b pb-4'>
			<div className='flex w-80 h-50'>
				<div className='grid place-items-center'>
					<Checkbox
						onChange={() => handleCheck(course._id)}
						checked={course._id in localCartObject}
					/>
				</div>
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
					<p className='font-semibold mb-2'>${course.price}</p>
				</div>
				<div>
					<Button
						size='small'
						color='error'
						sx={{ fontWeight: 600 }}
						onClick={() => handleDelete(course._id)}
					>
						Delete
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
