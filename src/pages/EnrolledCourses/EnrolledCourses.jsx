import React, { useState, useEffect } from 'react';

import Wrapper from '../../components/Wrapper';
import EnrolledItem from './EnrolledItem';
import ThingsToKnow from './ThingsToKnow';
import { useStoreHook } from '../../hooks';

const EnrolledCourses = () => {
	const [coursesEnrolled, setCoursesEnrolled] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { courses, user } = useStoreHook();
	const { loggedIn } = user;

	useEffect(() => {
		setIsLoading(true);
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
			<p className='page-subtitle max-w-4xl leading-none mb-12'>
				{title}
			</p>
			<div className='flex flex-wrap gap-8 flex-col-reverse lg:flex-row pb-12'>
				<div className='flex flex-1 flex-col gap-5 mb-12'>
					{coursesEnrolled.map((course) => (
						<EnrolledItem key={course._id} course={course} />
					))}
					{showEmptyImage && (
						<p className='text-md sm:text-lg -mt-4 animate-fade-in'>
							You are either not enrolled in any courses, or we cannot locate
							your courses.
						</p>
					)}
				</div>
				<ThingsToKnow />
			</div>
		</div>
	);
};

export default Wrapper(EnrolledCourses);
