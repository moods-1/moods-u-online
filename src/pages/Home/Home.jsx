import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';

import Wrapper from '../../components/Wrapper';
import CourseCard from './HomeCourseCard';
import Slider from '../../components/CustomSlider';
import { Hero } from '../../assets';
import { LogoDark } from '../../assets';
import CustomButton from '../../components/CustomButton';
import { HERO_TYPEWRITER } from '../../helpers/constants';
import Testimonials from './Testimonials';
import Benefits from './Benefits';
import { useStoreHook } from '../../hooks';

const Home = () => {
	const [eCourses, setECourses] = useState([]);
	const { courses } = useStoreHook();
	const navigate = useNavigate();

	useEffect(() => {
		setECourses([...courses]);
	}, [courses]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleHeroButton = () => {
		navigate('/courses');
	};

	const sliderData = eCourses.map((course) => <CourseCard course={course} />);

	return (
		<div className='mb-5'>
			<div className='w-full lg:w-[100%] mx-auto relative mb-0 sm:mb-14 min-h-[300px]'>
				<img
					src={Hero}
					alt='world-code'
					width={'100%'}
					className='min-h-[250px]'
				/>
				<div className='flex flex-col items-start justify-center absolute top-0 w-full lg:w-[70%] h-full p-6 sm:p-10'>
					<img
						src={LogoDark}
						alt='logo'
						className='w-[100px] sm:w-[160px] bg-white'
					/>
					<div className='text-3xl sm:text-[40px] lg:text-[60px] font-bold text-black leading-none bg-white bg-opacity-50 md:bg-opacity-100'>
						Code Your Way to
						<Typewriter
							options={{
								strings: HERO_TYPEWRITER,
								autoStart: true,
								loop: true,
								cursorClassName: 'text-blue-700',
								wrapperClassName: 'text-blue-700',
							}}
						/>
					</div>
					<div className='hidden sm:block'>
						<CustomButton
							title="Let's Begin"
							fontSize='xl'
							fontColor='white'
							bgColor='black'
							clickFunction={handleHeroButton}
							classString='hover:bg-blue-900 hover:text-white lg:text-xl'
						/>
					</div>
				</div>
			</div>
			<Benefits />
			<Testimonials />
			{sliderData.length > 0 && (
				<>
					<div className='flex flex-wrap items-center justify-between mb-1 gap-5'>
						<p className='page-subtitle'>Popular Courses</p>
					</div>
					<Slider data={sliderData} />
				</>
			)}
		</div>
	);
};

export default Wrapper(Home);
