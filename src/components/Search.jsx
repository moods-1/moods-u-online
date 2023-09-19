import { SearchSharp, DeleteForever } from '@mui/icons-material';
import React from 'react';

const Search = ({ value, changeFunction, placeholder, handleClear }) => {
	return (
		<div className='w-full flex items-center border h-9 min-w-[200px] max-w-[300px] max rounded-md overflow-hidden px-2 py-2'>
			<input
				className='border-0 outline-none flex-1 px-2 min-w-[100px]'
				type='text'
				value={value}
				placeholder={placeholder || 'Search ...'}
				onChange={changeFunction}
			/>
			{value ? (
				<DeleteForever
					color='error'
					onClick={handleClear}
					className='cursor-pointer'
				/>
			) : (
				<SearchSharp />
			)}
		</div>
	);
};

export default Search;
