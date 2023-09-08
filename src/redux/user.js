import { createSlice, current } from '@reduxjs/toolkit';
import { setLocalStorage } from '../helpers/helperFunctions';

const initialState = {
	user: {},
	cart: [],
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
			state.user = action.payload;
			state.cart = [];
			setLocalStorage('cart', JSON.stringify([]));
		},
		addToCart: (state, action) => {
			const { cart } = current(state);
			const itemInCart = cart.find((i) => i === action.payload);
			if (!itemInCart) {
				state.cart = [...new Set([...state.cart, action.payload])];
			}
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
	removeFromCart,
	emptyCart,
} = userSlice.actions;

export default userSlice.reducer;
