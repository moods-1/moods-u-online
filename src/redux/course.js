import { createSlice } from '@reduxjs/toolkit';

import { getAllCourses } from '../api/courses';

const fetchAllCourses = async () => {
	const result = await getAllCourses();
	const { status, response } = result;
	if (status < 400) {
		return response;
	}
	return [];
};

const allCourses = await fetchAllCourses();

const initialState = {
	courses: [...allCourses],
};

export const courseSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {
		loadAllCourses: (state, action) => {
			state.courses = [...action.payload];
		},
	},
});

// Action creators are generated for each case reducer function
export const { loadAllCourses } =
	courseSlice.actions;

export default courseSlice.reducer;
