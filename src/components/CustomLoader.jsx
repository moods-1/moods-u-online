import React from 'react';
import { CircularProgress } from '@mui/material';

const CustomLoader = ({  size, color }) => {
	
	return <div className='grid place-items-center w-full'><CircularProgress color={color || 'primary'} size={size || '3rem'} /></div>;
};

export default CustomLoader;
