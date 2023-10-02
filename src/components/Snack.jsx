import { useSnackbar } from 'notistack';

const Snack = ({ message, type, duration }) => {
	const { enqueueSnackbar } = useSnackbar();

	return enqueueSnackbar(message, {
		variant: type,
		autoHideDuration: duration,
	});
};

export default Snack;
