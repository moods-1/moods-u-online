import React from 'react';
import { Checkbox, Button, Grid } from '@mui/material';

const CartItem = ({ course, handleCheck, handleDelete, localCartObject }) => {
	return (
		<Grid container key={course._id} spacing={3} className='border-b pb-4'>
			<Grid item xs={12} sm={12} md={6} lg={2} className='flex items-center'>
				<div className='w-12 h-full grid place-items-center'>
					<Checkbox
						onChange={() => handleCheck(course._id)}
						checked={course._id in localCartObject}
						size='small'
					/>
				</div>
				<div className='flex-1 h-full sm:max-h-[160px]'>
					<img src={course.image} alt={course.title} className='h-full' />
				</div>
			</Grid>
			<Grid item xs={12} sm={12} md={6}>
				<p className='text-md sm:text-xl font-semibold'>{course.title}</p>
			</Grid>

			<Grid item xs={12} md={3} className='flex justify-between gap-x-4'>
				<p className='font-semibold mb-2'>${course.price}</p>
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
			</Grid>
		</Grid>
	);
};

export default CartItem;
