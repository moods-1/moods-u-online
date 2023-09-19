import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../helpers/helperFunctions';
import Avatar from '../assets/defaultAvatar.png';
import ClickOutsideHandler from './ClickOutsideHandler';
import { logoutUser } from '../redux/user';
import UserModal from './modals/UserModal';

const User = ({ closeMenu, handleNavItemChange, user }) => {
	const [showUserModal, setShowUserModal] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const { image, firstName, loggedIn } = user;
	const dispatch = useDispatch();
	const userDetailsRef = useRef();
	const profile = image || Avatar;
	
	const handleDetails = () => {
		setShowDetails((prev) => !prev);
		handleNavItemChange();
	};

	const logout = () => {
		userLogout();
		dispatch(logoutUser());
	};

	const login = () => {
		window.location.href = '/auth';
	};

	const userModalToggle = () => {
		setShowDetails(false);
		setShowUserModal((prev) => !prev);
	};
	const handleEdit = () => {
		setShowDetails(false);
		setShowUserModal(true);
	};

	useEffect(() => {
		if (closeMenu) {
			setShowDetails(false);
		}
	}, [closeMenu]);

	const logFunction = loggedIn ? logout : login;
	const logType = loggedIn ? 'Logout' : 'Login';

	return (
		<>
			<ClickOutsideHandler outsideFunction={() => setShowDetails(false)}>
				<div className='relative'>
					<div className='w-8 h-8 cursor-pointer rounded-full border grid place-items-center'>
						<img
							src={profile}
							alt='avatar'
							width={'100%'}
							height={'100%'}
							onClick={handleDetails}
							className='rounded-full'
						/>
					</div>

					{showDetails && (
						<div
							ref={userDetailsRef}
							className='absolute flex flex-col min-w-[130px] shadow-md right-0 bg-white'
						>
							<p className='px-4 py-1'>{firstName}</p>
							{loggedIn && (
								<>
								<NavLink
									to='/enrolled-courses'
									className='dropdown-link'
									onClick={handleDetails}
								>
									My Courses
								</NavLink>
								<NavLink
									to='/orders'
									className='dropdown-link'
									onClick={handleDetails}
								>
									My Orders
								</NavLink>
								<p
								className='cursor-pointer dropdown-link'
								onClick={handleEdit}
							>
								Profile
							</p>
								</>
								
							)}
							<p className='cursor-pointer dropdown-link' onClick={logFunction}>
								{logType}
							</p>
						</div>
					)}
				</div>
			</ClickOutsideHandler>
			{showUserModal && (
				<UserModal
					open={showUserModal}
					handleClose={userModalToggle}
					user={user}
					type={'edit'}
				/>
			)}
		</>
	);
};

export default User;
