import React, { useState } from 'react';
import { Modal, Button, Slide } from '@mui/material';
import emailjs from '@emailjs/browser';

import CustomInput from '../CustomInput';
import { formValidator } from '../../helpers/helperFunctions';

const EmailModal = ({ open, onClose, userData, loggedIn }) => {
	const { email, firstName, lastName } = userData;
	const fullName = `${firstName} ${lastName}`;
	const [formError, setFormError] = useState({});
	const [message, setMessage] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		name: fullName || '',
		email: email || '',
		subject: '',
		message: '',
	});

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

	const messageHandler = (text, color, close) => {
		setMessage({ text, color });
		setTimeout(() => {
			setMessage({});
			if (close) onClose();
		}, 4000);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		let formData = {};
		if (loggedIn) formData = { message: form.message, subject: form.subject };
		else formData = { ...form };

		const validatedData = formValidator(formData);
		const { error, errorObject } = validatedData;
		setFormError(errorObject);
		if (error) {
			setSubmitting(false);
			return null;
		}

		emailjs
			.sendForm(
				process.env.REACT_APP_EMAILJS_SERVICE_ID,
				process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
				e.target,
				process.env.REACT_APP_EMAILJS_PUBLIC_KEY
			)
			.then(
				() => {
					messageHandler('Email sent successfully!', 'bg-green-500', true);
				},
				(error) => {
					setSubmitting(false);
					console.error(error);
					messageHandler(
						'Ahh, something went wrong. Please try again.',
						'bg-red-500',
						false
					);
				}
			);
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			className='relative outline-none bg-transparent'
		>
			<Slide in={open} timeout={750} direction='left'>
				<form
					onSubmit={handleSubmit}
					className='absolute user-modal-form bg-white p-5 min-h-screen right-0 border-none outline-none'
				>
					<p
						className='absolute top-1 right-3 font-bold cursor-pointer hover:text-red-600 select-none'
						onClick={onClose}
					>
						X
					</p>{' '}
					<p className='text-2xl font-semibold mb-6 text-center'>
						Email Support
					</p>
					<CustomInput
						changeFunction={handleChange}
						placeholder='Name'
						className=''
						label='Name'
						type='text'
						name='name'
						value={form.name}
						requiredStar
						invalid={formError.firstName}
						readOnly={loggedIn}
					/>
					{formError.firstName && (
						<p className='text-xs text-red-700'>{formError.firstName}</p>
					)}
					<CustomInput
						changeFunction={handleChange}
						placeholder='Email'
						className=''
						label='Email'
						type='text'
						name='email'
						value={loggedIn ? email : form.email}
						requiredStar
						invalid={formError.email}
						readOnly={loggedIn}
					/>
					{formError.email && (
						<p className='text-xs text-red-700'>{formError.email}</p>
					)}
					<CustomInput
						changeFunction={handleChange}
						placeholder='Subject'
						className=''
						label='Subject'
						type='text'
						name='subject'
						value={form.subject}
						requiredStar
						invalid={formError.subject}
					/>
					{formError.subject && (
						<p className='text-xs text-red-700'>{formError.subject}</p>
					)}
					<div className='flex mt-3'>
						<label className='text-sm inline-block font-semibold'>
							Message
						</label>
						<span className='text-red-600'>*</span>
					</div>
					<textarea
						placeholder='Message ...'
						value={form.message}
						onChange={handleChange}
						rows={4}
						maxLength={150}
						name='message'
						style={{ borderColor: formError.message ? 'red' : '' }}
						className='w-full focus:border-blue-500 outline-none border rounded-sm px-3 py-1 resize-none'
					/>
					{formError.message && (
						<p className='text-xs text-red-700'>{formError.message}</p>
					)}
					{message.text ? (
						<div
							className={`${message.color} text-[14px] rounded-md p-3 mt-[20px]`}
						>
							<span>{message.text}</span>
						</div>
					) : (
						<Button
							fullWidth
							sx={{ marginTop: '20px' }}
							type='submit'
							className='black-button'
							variant='contained'
							disabled={submitting}
						>
							{submitting ? 'Submitting ...' : 'Submit'}
						</Button>
					)}
				</form>
			</Slide>
		</Modal>
	);
};

export default EmailModal;
