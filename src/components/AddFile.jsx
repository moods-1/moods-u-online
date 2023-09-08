import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@mui/material';

const AddFile = ({
	file,
	setFile,
	image,
	setImage,
	limit,
	displayError,
	inputName,
}) => {
	const onDrop = (acceptedFiles) => {
		const localFile = acceptedFiles[0];
		const localLimit = limit || 200000;
		if (localFile.size > localLimit) {
			displayError('Please use a file no greater than 200Kb.', 'info');
		} else {
			const blob = new Blob([localFile], { type: 'image/jpeg' });
			const reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = async () => {
				setImage(reader.result);
			};
			setFile(localFile);
		}
	};

	const { fileRejections, getRootProps, getInputProps, isDragActive } =
		useDropzone({
			accept: {
				'image/png': ['.png'],
				'image/jpeg': ['.jpg', '.jpeg'],
			},
			onDrop,
		});

	useEffect(() => {
		if (fileRejections.length > 0) {
			displayError('Only .jpg, .jpeg, and .png are accepted.', 'info');
		}
	}, [fileRejections.length, displayError]);

	let dragBody;

	if (file || image) {
		dragBody = (
			<div className='mx-auto grid place-items-center w-full'>
				<img
					src={image}
					alt='user'
					width='60px'
					height='60px'
					className='rounded-full'
				/>
			</div>
		);
	} else if (isDragActive) {
		dragBody = (
			<div className='mx-auto grid place-items-center border border-dashed rounded-lg h-20'>
				<p>Drop the image here ...</p>
			</div>
		);
	} else {
		dragBody = (
			<div className='mx-auto grid place-items-center border border-dashed rounded-lg h-20'>
				<p>
					Drop an image here, or{' '}
					<span className='cursor-pointer text-blue-600'>choose an image.</span>
				</p>
			</div>
		);
	}

	return (
		<div className='w-full relative my-4 mx-auto text-center'>
			<p className='text-xl font-medium mb-2'>Avatar</p>
			<div {...getRootProps({ className: 'dropZone my-4' })}>
				<input {...getInputProps()} />
				{dragBody}
			</div>
			{(file || image) && (
				<Button
					className='my-4'
					onClick={() => {
						setImage(null);
						setFile(null);
					}}
				>
					Change Image
				</Button>
			)}
		</div>
	);
};

export default AddFile;
