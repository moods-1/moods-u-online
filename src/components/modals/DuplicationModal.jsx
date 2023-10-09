import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { Error } from '@mui/icons-material';

import { useStoreHook } from '../../redux';

const PaymentSuccessModal = ({ open, onClose, duplicates }) => {
	const { courses } = useStoreHook();
	const [duplicateCourses, setDuplicateCourses] = useState([]);

	useEffect(() => {
		const items = [];
		duplicates.forEach((id) => {
			const item = courses.find((c) => c._id === id);
			if (item) items.push(item);
		});
		setDuplicateCourses([...items]);
	}, [courses, duplicates]);

	return (
		<Modal
			open={open}
			onClose={onClose}
			className='outline-none border-none grid place-items-center'
		>
			<div className='bg-white max-w-md min-h-[340px] overflow-y-auto sm:h-96 p-6 outline-none rounded-xl m-4 text-center'>
				<p className='text-xl font-semibold mb-2'>
					<Error color='error' className='-mt-1' /> Duplication Error
				</p>
				<p className='mb-6'>You are already enrolled in these courses. Please remove them from your cart.</p>
				{duplicateCourses.map((course) => (
					<div key={course._id} className='flex gap-5 py-2 border-b'>
						<img src={course.image} alt={course.title} className='w-24 h-14' />
						<p className='font-medium text-sm sm:text-base'>{course.title}</p>
					</div>
				))}
			</div>
		</Modal>
	);
};

export default PaymentSuccessModal;
