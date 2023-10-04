import React from 'react';
import { Modal, Slide } from '@mui/material';
// import io from 'socket.io-client';

import { makeRandomId } from '../../../helpers/helperFunctions';
import Chat from './Chat';


const ChatModal = ({ open, onClose, user }) => {
	// const socket = io.connect('http://localhost:80');
	// const socket = io.connect('https://moods-u-server.vercel.app/api:5055');
	const room = user._id ? user._id : makeRandomId(8);
	// const { _id: id, firstName } = user;
	// const userData = { originator:firstName, room, id };
	
	// if (id && room) {
	// 	socket.emit('join_room', userData);
	// }
	const handleCloseChat = () => {
		onClose();
	};

	return (
		<Modal
			open={open}
			onClose={handleCloseChat}
			className='relative outline-none bg-transparent'
		>
			<Slide in={open} timeout={750} direction='left'>
				<div className='absolute user-modal-form bg-white p-5 min-h-screen right-0 border-none outline-none'>
					<p
						className='absolute top-1 right-3 font-bold cursor-pointer hover:text-red-600 select-none'
						onClick={onClose}
					>
						X
					</p>{' '}
					<p className='text-2xl font-semibold mb-6 text-center'>
						Chat Support
					</p>
					{/* <Chat socket={socket} user={user} room={room} /> */}
					<Chat user={user} room={room} />
					
				</div>
			</Slide>
		</Modal>
	);
};

export default ChatModal;
