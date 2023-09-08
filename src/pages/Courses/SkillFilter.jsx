import React, { useState, useEffect } from 'react';
import { Checkbox } from '@mui/material';

import { SKILL_FILTER_DATA } from '../../helpers/constants';

const SkillFilter = ({ reset, handleFilter }) => {
	const [skillObject, setSkillObject] = useState({});

	const handleCheck = (e) => {
		const localObj = { ...skillObject };
		const { value, checked } = e.target;
		if (checked) {
			localObj[value] = value;
		} else {
			delete localObj[value];
		}
		setSkillObject({ ...localObj });
		const removeField = Object.values(localObj).length < 1;
		handleFilter({
			field: 'skillLevel',
			remove: removeField,
			skillLevel: new Set([...Object.values(localObj)]),
		});
    };
   
	useEffect(() => {
		if (reset) {
			setSkillObject({});
		}
	}, [reset]);

	return (
		<div className='flex flex-col w-52 filter-checkbox px-2 pb-2'>
			<p className='font-semibold mb-3'>Skill Level</p>
			{SKILL_FILTER_DATA.map(({ name, value }) => (
				<span key={name} className='filter-line'>
					<Checkbox
						value={value}
						checked={value in skillObject}
						disableRipple
						onChange={handleCheck}
					/>{' '}
					<span>{value}</span>
				</span>
			))}
		</div>
	);
};

export default SkillFilter;
