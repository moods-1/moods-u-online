import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Rating } from '@mui/material';

import { RATINGS_FILTER_DATA } from '../../helpers/constants';

const RatingFilter = ({ reset, handleFilter, buttonImage }) => {
	const [selected, setSelected] = useState({});

	const handleChange = (e) => {
		setSelected((prev) => (prev.name === e.name ? {} : e));
	};

	useEffect(() => {
		const removeFilter = Object.keys(selected).length < 1;
		handleFilter({
			field: 'rating',
			remove: removeFilter,
			rating: selected?.value,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

	useEffect(() => {
		if (reset) {
			setSelected([]);
		}
	}, [reset]);

	return (
		<div className='listbox-container md:w-48' style={{ zIndex: 100 }}>
			<Listbox value={selected} onChange={handleChange}>
				<div className='relative w-full z-10'>
					<Listbox.Button className='listbox-button'>
						<span>
							{selected.value ? (
								<span className='flex items-center'>
									<Rating size='small' value={selected.value} readOnly />
									<span className='listbox-plus'>+</span>
								</span>
							) : (
								'Rating'
							)}
						</span>
						<span className='listbox-button-img'>
							<span className='h-5 w-5' aria-hidden='true'>
								<img src={buttonImage} className='h-full w-full' alt='^' />
							</span>
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Listbox.Options className='listbox-options'>
							{RATINGS_FILTER_DATA.map((rating) => (
								<Listbox.Option
									key={rating.name}
									className={({ active }) =>
										`listbox-default-option ${
											active ? 'listbox-active-option' : 'text-gray-900'
										}`
									}
									value={rating}
								>
									{({ selected }) => (
										<>
											<span
												className={`truncate flex items-center ${
													selected ? 'font-medium' : 'font-normal'
												}`}
											>
												<Rating value={rating.value} readOnly size='small' />
												<span className='listbox-plus'>+</span>
											</span>
											{selected ? (
												<span className='listbox-checkmark'>&#x2713;</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
};

export default RatingFilter;
