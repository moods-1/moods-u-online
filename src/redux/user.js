import { createSlice, current } from '@reduxjs/toolkit';
import {
	setLocalStorage,
	getStoredUser,
	deleteStorageItem,
	handleLogin,
	getStoredCart,
} from '../helpers/helperFunctions';
import { getUserById } from '../api/user';

const fetchUser = async () => {
	const storedUser = getStoredUser();
	if (storedUser) {
		const { _id } = storedUser;
		const result = await getUserById(_id);
		const { status, message, response } = result;
		if (status < 400 && response) {
			deleteStorageItem('cart');
			handleLogin(response);
			return { ...response, loggedIn: true };
		} else {
			if ('email' in storedUser) {
				return { ...storedUser, loggedIn: true };
			}
			console.log({ message });
		}
	}
	return {enrolledCourses:[]};
};

const fetchedUser = await fetchUser();
const storeCart = fetchedUser?.cart || getStoredCart() || [];
 
const initialState = {
	user: { ...fetchedUser },
	cart: [...storeCart],
	checkoutCart: [],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loadUser: (state, action) => {
			const { cart } = action.payload;
			state.user = { ...action.payload };
			if (cart) {
				state.cart = [...new Set([...state.cart, ...cart])];
			}
		},
		updateUser: (state, action) => {
			state.user = { ...state.user, ...action.payload };
		},
		updateUserPostCheckout: (state, action) => {
			const user = action.payload;
			state.user = { ...user, loggedIn: true };
			state.cart = [];
			setLocalStorage('cart', JSON.stringify([]));
			setLocalStorage('user', JSON.stringify(user));
		},
		addToCart: (state, action) => {
			const { cart } = current(state);
			const itemInCart = cart.find((i) => i === action.payload);
			if (!itemInCart) {
				state.cart = [...new Set([...state.cart, action.payload])];
			}
		},
		loadCart: (state, action) => {
			const { cart } = current(state);
			state.cart = [...new Set([...cart, ...action.payload])];
		},
		removeFromCart: (state, action) => {
			const { cart } = current(state);
			const items = cart.filter((i) => i !== action.payload);
			state.cart = items;
		},
		emptyCart: (state) => {
			state.cart = [];
		},
		logoutUser: (state) => {
			state.user = {};
			state.cart = [];
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	loadUser,
	updateUser,
	updateUserPostCheckout,
	logoutUser,
	addToCart,
	loadCart,
	removeFromCart,
	emptyCart,
} = userSlice.actions;

export default userSlice.reducer;
