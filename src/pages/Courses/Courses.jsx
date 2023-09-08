import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ExpandMore } from '@mui/icons-material';

import Wrapper from '../../components/Wrapper';
import Search from '../../components/Search';
import CourseCard from '../../components/CourseCard';
import NothingToSeeHere from '../../components/NothingHere';
import SkillFilter from './SkillFilter';
import RatingFilter from './RatingFilter';
import PriceFilter from './PriceFilter';

const Courses = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [eCourses, setECourses] = useState([]);
	const [fil, setFil] = useState('');
	const [showFilters, setShowFilters] = useState(false);
	const [resetFilters, setResetFilters] = useState(true);
	const [filterObject, setFilterObject] = useState({});
	const { courses } = useSelector((state) => state.course);
	
	const filteredData = eCourses.filter((c) => {
		let returnValue = false;
		// Check if the filters are being used
		const hasFilters = Object.keys(filterObject).length > 0;
		if (hasFilters) {
			const { rating, skillLevel, price } = c;
			// Check which filters are being used
			const skillLevelPresent = 'skillLevel' in filterObject;
			const ratingPresent = 'rating' in filterObject;
			const pricePresent = 'price' in filterObject;
			// Compare course values to filter values
			const filterSkillLevel = skillLevelPresent
				? filterObject.skillLevel.has(skillLevel)
				: null;
			const filterRating = ratingPresent ? rating > filterObject.rating : null;
			const filterPrice = pricePresent
				? price > filterObject.price.min && price < filterObject.price.max
				: null;

			if (skillLevelPresent && ratingPresent && pricePresent) {
				returnValue = filterSkillLevel && filterRating && filterPrice;
			} else if (skillLevelPresent && ratingPresent) {
				returnValue = filterSkillLevel && filterRating;
			} else if (skillLevelPresent && pricePresent) {
				returnValue = filterSkillLevel && filterPrice;
			} else if (ratingPresent && pricePresent) {
				returnValue = filterRating && filterPrice;
			} else if (skillLevelPresent) returnValue = filterSkillLevel;
			else if (ratingPresent) returnValue = filterRating;
			else if (pricePresent) returnValue = filterPrice;
		} else {
			let criteria = '';
			criteria += c.title;
			returnValue = criteria.toLowerCase().includes(fil);
		}
		return returnValue;
	});

	const showEmptyImage = filteredData.length < 1 && !isLoading;

	const handleFilter = (e) => {
		const { value } = e.target;
		setFilterObject({});
		setShowFilters(false);
		setFil(value.toLowerCase());
	};

	const handleClearFilter = () => {
		setFil('');
	};

	const handleFilterObject = (data) => {
		let localFilterObject = { ...filterObject };
		const { remove, field } = data;
		delete data.remove;
		if (remove) {
			delete localFilterObject[field];
		} else {
			delete data.field;
			localFilterObject = { ...localFilterObject, ...data };
		}
		setFilterObject({ ...localFilterObject });
	};

	useEffect(() => {
		setECourses([...courses]);
		setIsLoading(false);
	}, [courses]);

	useEffect(() => {
		let localShow = showFilters;
		if (!localShow) {
			setFilterObject({});
		}
		setResetFilters(!showFilters);
	}, [showFilters]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className='w-full'>
			<p className='text-3xl sm:text-4xl max-w-4xl font-serif leading-none mb-10'>
				Development Courses
			</p>
			<div>
				<Search
					value={fil}
					placeholder='Search courses ...'
					changeFunction={handleFilter}
					handleClear={handleClearFilter}
				/>
				<div className='mt-6'>
					<div className='flex'>
						<button
							className='text-xl font-semibold'
							aria-expanded={showFilters}
							onClick={() => setShowFilters((prev) => !prev)}
							disabled={isLoading}
						>
							Filters <ExpandMore />{' '}
						</button>
					</div>
					{showFilters && (
						<div className='w-full flex flex-wrap mt-2'>
							<SkillFilter
								reset={resetFilters}
								handleFilter={handleFilterObject}
							/>
							<RatingFilter
								reset={resetFilters}
								handleFilter={handleFilterObject}
							/>
							<PriceFilter
								reset={resetFilters}
								handleFilter={handleFilterObject}
							/>
						</div>
					)}
				</div>
				<div className='flex flex-wrap gap-5 my-12 justify-center sm:justify-start'>
					{filteredData.map((course) => (
						<CourseCard course={course} key={course._id} />
					))}
					{showEmptyImage && <NothingToSeeHere />}
				</div>
			</div>
		</div>
	);
};

export default Wrapper(Courses);
