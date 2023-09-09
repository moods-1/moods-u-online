import React, { useState, useEffect } from 'react';
import { Modal, Button, Slide } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import { formValidator, handleUserUpadte } from '../../helpers/helperFunctions';
import CustomInput from '../CustomInput';
import AddFile from '../AddFile';
import { updateUserDetails } from '../../api/user';
import { updateUser } from '../../redux/user';

const UserModal = ({ open, handleClose, user, type }) => {
	const [form, setForm] = useState({
		firstName: user.firstName || '',
		lastName: user.lastName || '',
		email: user.email || '',
		password: '',
	});
	const [formError, setFormError] = useState({});
	const [passwordRequired, setPasswordRequired] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [imageError, setImageError] = useState('');
	const [file, setFile] = useState(null);
	const [image, setImage] = useState(null);
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();

	const snack = (message, type, duration) => {
		setSubmitting(false);
		return enqueueSnackbar(message, {
			variant: type,
			autoHideDuration: duration,
		});
	};
	
	const handleChange = (e) => {
		const { target } = e;
		const { name, value } = target;
		let localValue;
		if (name !== 'email') {
			localValue = value.replace(/\s{2,}/g, ' ').trimStart();
		} else {
			localValue = value.replace(/\s+/g, '').trimStart();
		}
		setForm((prevState) => ({ ...prevState, [name]: localValue }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		let userForm = { ...form, id: user._id, image };
		if (!passwordRequired) {
			delete userForm.password;
		}
		userForm.newImage = user.image !== image;
		const validatedData = formValidator(userForm);
		const { error, errorObject } = validatedData;
		setFormError(errorObject);
		if (error) {
			setSubmitting(false);
			return null;
		}

		const result = await updateUserDetails(userForm);
		const { status, message, response } = result;
		if (status < 400) {
			handleUserUpadte(response);
			dispatch(updateUser(response));
			handleClose();
		} else {
			return snack(message, 'error', 3000);
		}
		setSubmitting(false);
	};

	const handleImageError = (message) => {
		setImageError(message);
		setTimeout(() => {
			setImageError('');
		}, 4000);
	};

	useEffect(() => {
		setImage(user?.image);
	}, [user]);

	useEffect(() => {
		const passRequired = form.password;
		if (passRequired) {
			setPasswordRequired(true);
		} else {
			setPasswordRequired(false);
			setFormError((prev) => ({ ...prev, password: '' }));
		}
	}, [form.password]);

	return (
		<Modal
			open={open}
			onClose={handleClose}
			className='relative outline-none'
			onSubmit={handleSubmit}
		>
			<Slide in={open} timeout={750} direction='left'>
				<form className='absolute user-modal-form bg-white p-5 min-h-screen right-0 border-none outline-none'>
					<p
						className='absolute top-1 right-3 font-bold cursor-pointer hover:text-red-600 select-none'
						onClick={handleClose}
					>
						X
					</p>{' '}
					<p className='text-2xl font-semibold text-center'>
						{type === 'edit' ? 'Edit' : 'New'} User
					</p>
					<AddFile
						file={file}
						setFile={setFile}
						image={image}
						setImage={setImage}
						size='sm'
						inputName='image'
						displayError={handleImageError}
					/>
					{imageError && <p className='text-sm text-red-700'>{imageError}</p>}
					<CustomInput
						name='firstName'
						changeFunction={handleChange}
						placeholder='First Name'
						className=''
						label='First Name'
						value={form.firstName}
						max={30}
						invalid={formError.firstName}
						requiredStar
					/>
					{formError.firstName && (
						<p className='text-xs text-red-700'>{formError.firstName}</p>
					)}
					<CustomInput
						name='lastName'
						changeFunction={handleChange}
						placeholder='Last Name'
						className=''
						label='Last Name'
						value={form.lastName}
						max={30}
						invalid={formError.lastName}
						requiredStar
					/>
					{formError.lastName && (
						<p className='text-xs text-red-700'>{formError.lastName}</p>
					)}
					<CustomInput
						changeFunction={handleChange}
						placeholder='Email'
						className=''
						label='Email'
						type='text'
						name='email'
						value={form.email}
						requiredStar
						invalid={formError.email}
					/>
					{formError.email && (
						<p className='text-xs text-red-700'>{formError.email}</p>
					)}
					<CustomInput
						changeFunction={handleChange}
						placeholder='Password'
						className=''
						label='Password'
						type='password'
						name='password'
						value={form.password}
						max={12}
						requiredStar={passwordRequired}
						invalid={formError?.password}
					/>
					{formError.password && (
						<p className='text-xs text-red-700'>{formError.password}</p>
					)}
					<Button
						fullWidth
						sx={{ marginTop: '20px' }}
						type='submit'
						color='primary'
						variant='contained'
						disabled={submitting}
					>
						Save
					</Button>
				</form>
			</Slide>
		</Modal>
	);
};

export default UserModal;
