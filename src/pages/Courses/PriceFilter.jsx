import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';

import { PRICE_FILTER_DATA } from '../../helpers/constants';

const PriceFilter = ({ reset, handleFilter, buttonImage }) => {
	const [selected, setSelected] = useState({});

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

	const handleChange = (e) => {
		setSelected((prev) => (prev.name === e.name ? {} : e));
	};

	useEffect(() => {
		const removeFilter = Object.keys(selected).length < 1;
		handleFilter({
			field: 'price',
			remove: removeFilter,
			price: selected?.value,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

	useEffect(() => {
		if (reset) {
			setSelected([]);
		}
	}, [reset]);

	return (
		<div className='listbox-container md:w-48'>
			<Listbox value={selected} onChange={handleChange}>
				<div className='relative w-full z-10'>
					<Listbox.Button className='listbox-button'>
						<span>
							{selected.value ? displaySetter(selected.value) : 'Price Range'}
						</span>
						<span className='listbox-button-img'>
							<span className='h-5 w-5 text-gray-400' aria-hidden='true'>
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
							{PRICE_FILTER_DATA.map((price) => (
								<Listbox.Option
									key={price.name}
									className={({ active }) =>
										`listbox-default-option ${
											active ? 'listbox-active-option' : 'text-gray-900'
										}`
									}
									value={price}
								>
									{({ selected }) => (
										<>
											<span
												className={`block truncate ${
													selected ? 'font-medium' : 'font-normal'
												}`}
											>
												{displaySetter(price.value)}
											</span>
											{selected ? (
												<span className='listbox-checkmark'>
													&#x2713;
												</span>
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

export default PriceFilter;
