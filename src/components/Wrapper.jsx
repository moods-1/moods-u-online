import React from 'react';

const Wrapper = (Component, idName) =>
	function HOC() {
		return (
			<div
				className='max-w-[1920px] mx-auto relative sm:px-12 lg:px-20 px-5 z-0 w-full full-height'
				id={idName || ''}
			>
				<Component />
			</div>
		);
	};

export default Wrapper;
