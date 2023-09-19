import React from 'react';

const CustomButton = ({
	title,
	fontSize,
	bgColor,
	fontColor,
	clickFunction,
	classString,
}) => {
	return (
		<button
			className={`bg-${bgColor} text-sm text-${fontColor} px-10 py-2 mt-8 rounded-full ${classString} `}
			onClick={clickFunction}
		>
			{title}
		</button>
	);
};

export default CustomButton;
