import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Wrapper from '../../components/Wrapper';
import SupportBox from './SupportBox';
import SupportMembers from './SupportMembers';

const Contact = () => {
	const { user } = useSelector(state => state.user);
	const { loggedIn } = user;
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate('/auth');
	};

	const handleEmail = () => {};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const chatProps = {
		text: `${
			loggedIn
				? 'Click chat to begin the process.'
				: 'Support is only available for logged in members.'
		}`,
		button: loggedIn ? (
			<Button className='black-button'>Chat</Button>
		) : (
			<Button className='black-button' onClick={handleLogin}>
				Log In
			</Button>
		),
	};

	const emailProps = {
		text: 'Send us an email and we’ll get back to you soon.',
		button: (
			<Button className='black-button' onClick={handleEmail}>
				Send email
			</Button>
		),
	};

	return (
		<div className='w-full pb-12'>
			<div className='w-full text-center'>
				<p className='text-3xl sm:text-5xl max-w-4xl mx-auto font-serif leading-none'>
					Get in touch with our super-friendly support team.
				</p>
				<p className='mt-6'>
					Our business hours are 7AM-7PM ET Monday-Friday and 9AM-3PM ET on
					weekends.
				</p>
			</div>
			<div className='flex flex-wrap justify-center gap-10 mt-16'>
				<SupportBox title={'Chat support'} {...chatProps} />
				<SupportBox title={'Email support'} {...emailProps} />
			</div>
			<div className='w-full mt-12 text-center'>
				<p className='text-xl sm:text-3xl font-serif'>
					Our actual support team
				</p>
				<p>
					The team consists of real people that care about helping make your
					experience at Moods U an awesome one.
				</p>
			</div>
			<SupportMembers />
		</div>
	);
};

export default Wrapper(Contact);
