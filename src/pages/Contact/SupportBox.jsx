import React from 'react';

const SupportBox = ({ title, text, button }) => {
	return (
		<div className='flex flex-col justify-between w-60 h-60 bg-blue-100 text-black rounded-lg py-6 px-4 text-center'>
			<div>
				<p className='font-serif font-medium mb-2 text-xl'>{title}</p>
				<p>{text}</p>
			</div>

			{button}
		</div>
	);
};

export default SupportBox;
