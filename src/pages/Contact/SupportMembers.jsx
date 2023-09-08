import React, { useState, useEffect } from 'react';

import { getEmployeesByDepartment } from '../../api/employees';
import { COMPANY_DEPARTMENTS } from '../../helpers/constants';
import SupportMember from './SupportMember';
import Loader from '../../components/CustomLoader';

const SupportMembers = () => {
	const [supportTeam, setSupportTeam] = useState([]);
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
			{isLoading ? (
				<Loader />
			) : (
				supportTeam.map((member) => <SupportMember member={member} />)
			)}
		</div>
	);
};

export default SupportMembers;
