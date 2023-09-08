import React, { useState, useEffect } from 'react';
import { Checkbox, Rating } from '@mui/material';

import { RATINGS_FILTER_DATA } from '../../helpers/constants';

const SkillFilter = ({ reset, handleFilter }) => {
	const [ratingObject, setRatingObject] = useState({});

	const handleCheck = (e) => {
		const localObj = {};
		const { value, checked } = e.target;
		if (checked) {
			localObj[value] = value;
		}
		setRatingObject({ ...localObj });
		handleFilter({
			field: 'rating',
			remove: !checked,
			rating: value,
		});
	};

	useEffect(() => {
		if (reset) {
			setRatingObject({});
		}
	}, [reset]);

	return (
		<div className='flex flex-col w-52 filter-checkbox px-2 pb-2'>
			<p className='font-semibold mb-3'>Rating</p>
			{RATINGS_FILTER_DATA.map(({ name, value }) => (
				<span className='filter-line' key={name}>
					<Checkbox
						disableRipple
						value={value}
						checked={value in ratingObject}
						onChange={handleCheck}
					/>{' '}
					<span className='font-semibold'>{'>'}</span>
					<Rating value={value} size='small' readOnly />{' '}
				</span>
			))}
		</div>
	);
};

export default SkillFilter;
