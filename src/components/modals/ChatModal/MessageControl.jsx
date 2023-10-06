import React from 'react';
import { Button } from '@mui/material';

import { SendPlane } from '../../../assets';

const MessageControl = ({ currentMessage, handleMessage, sendMessage }) => {
	return (
		<div className='w-full border flex'>
			<textarea
				rows={3}
				placeholder='Type message...'
				value={currentMessage}
				className='flex-1 resize-none p-2 outline-none'
				onChange={(e) => handleMessage(e.target.value)}
				onKeyDown={(e) => (e.key === 'Enter' ? sendMessage() : null)}
			/>
			<Button
				onClick={sendMessage}
				className='flex flex-col font-semibold bore'
			>
				<img src={SendPlane} alt='send' className='w-8' />{' '}
				<span className='font-semibold'>Send</span>
			</Button>
		</div>
	);
};

export default MessageControl;
