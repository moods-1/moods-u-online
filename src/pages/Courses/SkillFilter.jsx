import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';

import { SKILL_FILTER_DATA } from '../../helpers/constants';

const SkillFilter = ({ reset, handleFilter, buttonImage }) => {
	const [selectedSkill, setSelectedSkill] = useState([]);

	useEffect(() => {
		const skillSet = new Set([...selectedSkill.map((skill) => skill.name)]);
		const removeField = selectedSkill.length < 1;
		handleFilter({
			field: 'skillLevel',
			remove: removeField,
			skillLevel: skillSet,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedSkill]);

	useEffect(() => {
		if (reset) {
			setSelectedSkill([]);
		}
	}, [reset]);

	return (
		<div className='listbox-container md:w-72' style={{ zIndex: 101 }}>
			<Listbox value={selectedSkill} onChange={setSelectedSkill} multiple>
				<div className='relative w-full'>
					<Listbox.Button className='listbox-button'>
						<span>
							{selectedSkill.length
								? selectedSkill.map((skill) => skill.name).join(', ')
								: 'Skill Level'}
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
							{SKILL_FILTER_DATA.map((skill) => (
								<Listbox.Option
									key={skill.name}
									className={({ active }) =>
										`listbox-default-option ${
											active ? 'listbox-active-option' : 'text-gray-900'
										}`
									}
									value={skill}
								>
									{({ selected }) => (
										<>
											<span
												className={`block ${
													selected ? 'font-medium' : 'font-normal'
												}`}
											>
												{skill.name}
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
export default SkillFilter;
