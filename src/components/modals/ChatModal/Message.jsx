import React from 'react';
import moment from 'moment-timezone';

const Message = ({ originator, message, ownMessage, time }) => {
	const displayTime = moment(time).format('LT');
	return (
		<div className='max-w-[75%]'>
			<div
				className={`chat-message ${
					ownMessage ? 'your-message' : 'other-persons-message'
				}`}
			>
				{message}
			</div>
			<div
				className={`w-full text-sm flex ${!ownMessage ? 'justify-end' : ''}`}
			>
				<span>
					{originator} {displayTime}
				</span>
			</div>
		</div>
	);
};

export default Message;
