import React from 'react';
import { NavLink } from 'react-router-dom';

import Brand from './Brand';
import { LogoLight } from '../assets';
import { HEADER_LINKS } from '../helpers/constants';

const Footer = () => {
	return (
		<div className='mx-auto w-full max-w-[1920px] min-h-[80px] bg-black text-white sm:px-20 px-5 py-4'>
			<div className='flex justify-center gap-4 mb-4'>
				{HEADER_LINKS.map(({ name, route }) => (
					<NavLink to={route} key={name}>
						{name}
					</NavLink>
				))}
			</div>
			<div className=' flex justify-center items-center text-xs text-white gap-2'>
				<span>&copy; 2023</span>
				<Brand image={LogoLight} />
			</div>
		</div>
	);
};

export default Footer;
