import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Prerequisites = ({ prerequisites }) => {
	const { courses } = useSelector((state) => state.course);
	const [localCourses, setLocalCourses] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const items = [];
		prerequisites?.forEach((id) => {
			const pre = courses.find((c) => c._id === id);
			pre && items.push(pre);
		});
		setLocalCourses([...items]);
	}, [courses, prerequisites]);

	const handleClick = (id) => {
		navigate(`/details/${id}`);
	};

	return (
		<div className='my-3 flex flex-wrap gap-4'>
			<p>
				<span className='font-semibold'>Recommended Prerequisites:</span>{' '}
			</p>
			{localCourses.length
				? localCourses.map(({ icon, _id }) => (
						<img
							src={icon}
							alt='C'
							className='w-7 cursor-pointer'
							key={_id}
							onClick={() => handleClick(_id)}
						/>
				  ))
				: 'None'}
		</div>
	);
};

export default Prerequisites;
