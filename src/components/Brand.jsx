import React from 'react';
import { useNavigate } from 'react-router-dom';

const Brand = ({ image }) => {
	const navigate = useNavigate();
	const handleClick = () => {
		window.scrollTo(0, 0);
		navigate('/');
	};

	return (
		<div
			onClick={handleClick}
			className='w-[80px] grid place-items-center cursor-pointer'
		>
			<img src={image} alt='logo' />
		</div>
	);
};

export default Brand;
