import React from 'react';

const FineDetails = ({ skillLevel, time, completionDocument, languages, location }) => {
	
	const Languages = () => {
		const languageCount = languages.length;
		let output = '';
		languages.forEach((language, idx) => {
			if (idx + 1 === languageCount) {
				output += language;
			} else {
				output += `${language}, `;
			}
		});
		return output;
	};
	return (
		<div className='my-3'>
			<p className='col'>
				<span className='font-semibold'>Skill Level:</span> {skillLevel}
			</p>
			<p>
				<span className='font-semibold'>Duration:</span> {time} hours
			</p>
			<p>
				<span className='font-semibold'>Completion Document:</span>{' '}
				{completionDocument}
			</p>
			<p>
				<span className='font-semibold'>Location:</span>{' '}
				{location}
			</p>
			<p>
				<span className='font-semibold'>Languages:</span>{' '}
				<Languages />
			</p>
			
		</div>
	);
};

export default FineDetails;
