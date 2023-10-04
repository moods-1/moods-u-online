import React from 'react';

const Message = ({ originator, message, ownMessage }) => {
	return (
		<div className='max-w-[75%]'>
			<div
				className={`chat-message ${
					ownMessage ? 'your-message' : 'other-persons-message'
				}`}
			>
				{message}
			</div>
			<div className={`w-full flex ${!ownMessage ? 'justify-end' : ''}`}>
				<span className='text-sm'>{originator}</span>
			</div>
		</div>
	);
};

export default Message;
