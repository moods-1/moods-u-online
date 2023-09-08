import React from 'react';

import Brand from './Brand';
import { LogoLight } from '../assets';

const Footer = () => {
	return (
		<div className='mx-auto w-full max-w-[1920px] min-h-[80px] bg-black text-white sm:px-20 px-5 py-4'>		
				<Brand image={LogoLight} />
			<p className='text-center text-xs'>&copy; 2023 Moods U</p>
		</div>
	);
};

export default Footer;
