import React from 'react';

const SupportMember = ({ member }) => {
	const {
		_id: id,
		image,
		firstName,
		province,
		state,
		country,
		slogan,
	} = member;
	return (
		<div key={id} className='flex flex-col gap-3 w-60 h-60 p-4'>
			<img
				src={image}
				alt={firstName}
				className='w-20 h-20 rounded-full border'
            />
            <p className='font-serif text-xl font-medium'>{ firstName}</p>
			<p className='font-bold uppercase text-sm text-gray-700'>
				{province || state}, {country}
			</p>
			<p>{slogan}</p>
		</div>
	);
};

export default SupportMember;
