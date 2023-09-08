import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Wrapper from '../../components/Wrapper';
import EnrolledItem from './EnrolledItem';
import { NothingHere } from '../../assets';
import { getLoggedIn } from '../../helpers/helperFunctions';

const EnrolledCourses = () => {
	const [coursesEnrolled, setCoursesEnrolled] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useSelector((state) => state.user);
	const { courses } = useSelector((state) => state.course);
	const loggedIn = getLoggedIn();

	useEffect(() => {
		const localEnrolled = [];
		user?.enrolledCourses?.forEach((course) => {
			const item = courses.find((c) => c._id === course);
			if (item) {
				localEnrolled.push(item);
			}
		});
		setCoursesEnrolled([...localEnrolled]);
		setIsLoading(false);
	}, [courses, user.enrolledCourses]);

	const showEmptyImage = coursesEnrolled.length < 1 && !isLoading;

	const title = loggedIn
		? `${user.firstName}, here are your courses:`
		: 'You have to be logged in to view your courses.';

	return (
		<div className='min-h-[calc(100vh-110px)]'>
			<p className='text-3xl sm:text-4xl max-w-4xl font-serif leading-none mb-12'>
				{title}
			</p>
			<div className='flex flex-col gap-5 mb-12'>
				{coursesEnrolled.map((course) => (
					<EnrolledItem key={course._id} course={course} />
				))}
				{showEmptyImage && <img src={NothingHere} alt='nothing to see' className='lg:w-13 mx-auto'/>}
			</div>
		</div>
	);
};

export default Wrapper(EnrolledCourses);
