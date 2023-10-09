import { useSelector } from 'react-redux';

export const useStoreHook = () => {
	const { courses } = useSelector((state) => state.course);
	const { user, cart, checkoutCart } = useSelector((state) => state.user);
	return { courses, user, cart, checkoutCart };
};
