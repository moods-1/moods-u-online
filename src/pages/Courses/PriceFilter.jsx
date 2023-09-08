import React, { useState, useEffect } from 'react';
import { Checkbox } from '@mui/material';

import { PRICE_FILTER_DATA } from '../../helpers/constants';

const PriceFilter = ({ reset, handleFilter }) => {
	const [priceObject, setPriceObject] = useState({});
	const displaySetter = (values) => {
		const { min, max } = values;
		if (typeof min === 'number' && typeof max === 'number') {
			if (max < Number.MAX_SAFE_INTEGER) {
				return `$${min} - $${max}`;
			}
			return `$${min}+`;
		}
		return '$0+';
	};

	const handleCheck = (e) => {
		const localObj = {};
		const { name, checked } = e.target;
		const value = PRICE_FILTER_DATA.find((p) => p.name === name)?.value;
		if (checked) {
			localObj[name] = value;
		}
		setPriceObject({ ...localObj });
		handleFilter({
			field: 'price',
			remove: !checked,
			price: value,
		});
	};

	useEffect(() => {
		if (reset) {
			setPriceObject({});
		}
	}, [reset]);

	return (
		<div className='flex flex-col w-52 filter-checkbox px-2 pb-2'>
			<p className='font-semibold mb-3'>Price</p>
			{PRICE_FILTER_DATA.map(({ name, value }) => {
				const display = displaySetter(value);
				return (
					<span className='filter-line' key={name}>
						<Checkbox
							disableRipple
							name={name}
							value={value}
							checked={name in priceObject}
							onChange={handleCheck}
						/>{' '}
						<span className='text-[15px]'>{display}</span>
					</span>
				);
			})}
		</div>
	);
};

export default PriceFilter;
