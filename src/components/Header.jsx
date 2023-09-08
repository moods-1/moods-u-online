import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import Brand from './Brand';
import { HEADER_LINKS } from '../helpers/constants';
import NavCart from './NavCart';
import { LogoDark } from '../assets';
import User from './User';
import ClickOutsideHandler from './ClickOutsideHandler';

const Header = () => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [closeNavMenus, setCloseNavMenus] = useState(false);
	const { user } = useSelector((state) => state.user);
	const userLoggedIn = Object.keys(user).length > 0;

	const handleMenuClick = () => {
		setShowMobileMenu((prev) => !prev);
	};

	const handleLeaveNav = () => {
		setShowMobileMenu(false);
		setCloseNavMenus((prev) => !prev);
	};

	return (
		<div
			className='w-full max-w-[1920px] mx-auto h-[60px] flex bg-white text-black justify-between items-center sticky top-0 z-50 sm:px-20 px-5 mb-[50px] shadow-sm'
			onMouseLeave={handleLeaveNav}
		>
			<Brand image={LogoDark} />
			<div className='flex gap-4 items-center'>
				<ul className='gap-3 hidden sm:flex'>
					{HEADER_LINKS.map(({ name, route }) => (
						<NavLink to={route} key={name} className='hover:text-blue-600'>
							{name}
						</NavLink>
					))}
				</ul>
				<div className='relative sm:hidden'>
					<ClickOutsideHandler outsideFunction={() => setShowMobileMenu(false)}>
						<Menu onClick={handleMenuClick} className='cursor-pointer' />
						{showMobileMenu && (
							<ul className='absolute bg-white shadow-md min-w-[130px] right-0 flex flex-col'>
								{HEADER_LINKS.map(({ name, route }) => (
										<NavLink
											key={ name}
											className='dropdown-link'
											to={route}
											onClick={handleMenuClick}
										>
											{name}
										</NavLink>
								))}
							</ul>
						)}
					</ClickOutsideHandler>
				</div>
				<NavCart />
				<User
					closeMenu={closeNavMenus}
					userLoggedIn={userLoggedIn}
					user={user}
					handleNavItemChange={() => setCloseNavMenus(false)}
				/>
			</div>
		</div>
	);
};

export default Header;
