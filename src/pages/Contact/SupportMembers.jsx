import React, { useState, useEffect } from 'react';

import { getEmployeesByDepartment } from '../../api/employees';
import { COMPANY_DEPARTMENTS, SUPPORT_PLACEHOLDER } from '../../helpers/constants';
import SupportMember from './SupportMember';

const SupportMembers = () => {
	const [supportTeam, setSupportTeam] = useState([...SUPPORT_PLACEHOLDER]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		const getTeam = async () => {
			const result = await getEmployeesByDepartment(
				COMPANY_DEPARTMENTS.SUPPORT
			);
			const { status, message, response } = result;
			if (status < 400) {
				setSupportTeam([...response]);
			} else {
				console.log({ message });
			}
			setIsLoading(false);
		};
		getTeam();
	}, []);

	return (
		<div className='w-full flex flex-wrap gap-10 justify-evenly mt-16'>
			{supportTeam.map((member) => (
				<SupportMember key={member._id} member={member} isLoading={isLoading} />
			))}
		</div>
	);
};

export default SupportMembers;
