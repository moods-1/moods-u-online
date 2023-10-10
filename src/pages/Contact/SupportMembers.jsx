import React from 'react';

import { SUPPORT_TEAM } from '../../helpers/constants';
import SupportMember from './SupportMember';

const SupportMembers = () => {
	return (
		<div className='section-3'>
			{SUPPORT_TEAM.map((member) => (
				<SupportMember key={member._id} member={member} />
			))}
		</div>
	);
};

export default SupportMembers;
