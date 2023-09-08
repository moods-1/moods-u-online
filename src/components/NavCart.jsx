import React from 'react';
import { NavLink } from 'react-router-dom';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { ShoppingCart } from '@mui/icons-material';

const NavCart = () => {
	const { cart } = useSelector((state) => state.user);
	const cartItems = cart?.length || 0;
	return (
		<NavLink to='/cart'>
			<Badge badgeContent={cartItems} color='error' showZero={false} max={9}>
				<ShoppingCart />
			</Badge>
		</NavLink>
	);
};

export default NavCart;
