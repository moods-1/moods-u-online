import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@mui/material';
import Message from './Message';

const initialMessage = (user, room) => {
	const { firstName } = user;
	const message = `Welcome ${firstName}, how may I help you?`;
	const time = new Date();
	return { room, message, originator: 'Support', time };
};

const noSupportMessage = (user, room) => {
	const { firstName } = user;
	const message = `Sorry ${firstName}, our support team is not available at this time.`;
	const time = new Date();
	return { room, message, originator: 'Support', time };
};

const Chat = ({ socket, user, room }) => {
	const [currentMessage, setCurrentMessage] = useState('');
	const [messageList, setMessageList] = useState([initialMessage(user, room)]);
	const { firstName } = user;
	const lastMessageRef = useRef(null);

	const moveIntoView = () => {
		if (lastMessageRef?.current) {
			lastMessageRef.current.scrollIntoView({
				behavior: 'smooth',
			});
		}
	};

	const sendMessage = async (e) => {
		if (currentMessage && currentMessage !== '\n') {
			const messageData = {
				room,
				originator: user?.firstName,
				message: currentMessage,
				time: new Date(),
			};
			await socket.emit('send_message', messageData);
			const messagesLength = messageList.length;
			setMessageList((prev) => {
				if (messagesLength === 1) {
					const noSupport = noSupportMessage(user, room);
					return [...prev, messageData, noSupport];
				}
				return [...prev, messageData];
			});
		}
		setCurrentMessage('');
	};

	useEffect(() => {
		socket.on('receive_message', (data) => {
			setMessageList((prev) => [...prev, data]);
		});
		return () => null;
	}, [socket]);

	return (
		<>
			<div className='chat-box'>
				{messageList.map((message, idx) => {
					const ownMessage = message.originator === firstName;
					const lastMessage = messageList.length - 1 === idx;
					return (
						<div
							key={idx}
							className={`w-full mb-4 flex ${!ownMessage ? 'justify-end' : ''}`}
							ref={(el) => {
								if (lastMessage) {
									lastMessageRef.current = el;
									moveIntoView();
								}
							}}
						>
							<Message ownMessage={ownMessage} {...message} />
						</div>
					);
				})}
			</div>
			<div className='w-full border flex border-t-0'>
				<textarea
					rows={3}
					placeholder='Type message...'
					value={currentMessage}
					className='flex-1 resize-none p-2 outline-none'
					onChange={(e) => setCurrentMessage(e.target.value)}
					onKeyDown={(e) => (e.key === 'Enter' ? sendMessage() : null)}
				/>
				<Button onClick={sendMessage}>Send</Button>
			</div>
		</>
	);
};

export default Chat;
