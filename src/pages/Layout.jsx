import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { getStoredUser } from '../helpers/helperFunctions';
import { loadUser } from '../redux/user';

const Layout = () => {
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const storedUser = getStoredUser();

	useEffect(() => {
		if (storedUser && !('email' in user)) {
			if ('email' in storedUser) {
				dispatch(loadUser(storedUser));
			}
		}
	}, [dispatch, storedUser, user]);

	return (
		<div>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};

export default Layout;
