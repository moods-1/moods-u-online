import React from 'react';

import { SUPPORT_TEAM } from '../../helpers/constants';
import SupportMember from './SupportMember';

const SupportMembers = () => {
	return (
		<div className='w-full flex flex-wrap gap-10 justify-evenly mt-16'>
			{SUPPORT_TEAM.map((member) => (
				<SupportMember key={member._id} member={member} />
			))}
		</div>
	);
};

export default SupportMembers;
