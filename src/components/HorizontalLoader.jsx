import React from 'react';

const HorizontalLoader = ({ height }) => {
	return (
		<div className='horizontal-loader' style={{ height: height || '50px' }} />
	);
};

export default HorizontalLoader;
