import { useSnackbar } from 'notistack';

const Snack = ({ message, type, duration }) => {
	const { enqueueSnackbar } = useSnackbar();
	console.log({ message, type, duration });

	return enqueueSnackbar(message, {
		variant: type,
		autoHideDuration: duration,
	});
};

export default Snack;
