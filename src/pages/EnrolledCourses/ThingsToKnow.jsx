import React from 'react';
import { NewReleases } from '@mui/icons-material';

import { THINGS_TO_KNOW } from '../../helpers/constants';

const ThingsToKnow = () => {
	return (
		<div className='w-full sm:min-w-[300px] lg:max-w-md mb-12'>
			<p className='w-full bg-black text-white text-center font-semibold text-2xl py-2'>
				Things to Know
			</p>
			<div className='w-full p-2 pt-6 bg-blue-100'>
				{THINGS_TO_KNOW.map(({ id, data }) => (
					<p key={id} className='flex mb-1'>
						<NewReleases fontSize='small' color='primary' className='mr-1' />
						{data}
					</p>
				))}
			</div>
		</div>
	);
};

export default ThingsToKnow;
