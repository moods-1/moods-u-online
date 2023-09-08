import React from 'react';
import PropTypes from 'prop-types';

const CustomInput = ({
	value,
	placeholder,
	changeFunction,
	className,
	label,
	type,
	name,
	max,
	invalid,
	required,
	requiredStar,
}) => {
	return (
		<div className='mt-3'>
			{label && (
				<div className='flex'>
					<label className='text-sm inline-block font-semibold'>{label}</label>
					{requiredStar && <span className='text-red-600'>*</span>}
				</div>
			)}

			<input
				className={`w-full focus:border-blue-500 outline-none border rounded-sm px-3 py-1 ${className}`}
				value={value}
				placeholder={placeholder}
				onChange={changeFunction}
				type={type || 'text'}
				name={name || ''}
				maxLength={max || null}
				style={{ borderColor: invalid ? 'red' : '' }}
				required={required || false}
			/>
		</div>
	);
};

export default CustomInput;

CustomInput.propTypes = {
	value: PropTypes.string,
	changeFunction: PropTypes.func.isRequired,
	className: PropTypes.string,
	placeholder: PropTypes.string.isRequired,
	label: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	max: PropTypes.number,
	invalid: PropTypes.string,
};
