import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './course';
import userReducer from './user';

export default configureStore({
	devTools: true,
	reducer: {
        course: courseReducer,
        user: userReducer,
	},
});
