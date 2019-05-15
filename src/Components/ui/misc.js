import React from 'react';
import { Link } from 'react-router-dom';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const Tag = (props) => {
	const template = (
		<div
			style={{
				background: props.bck,
				color: props.color,
				fontSize: props.size,
				display: 'inline-block',
				padding: '5px 10px',
				fontFamily: 'Righteous',
				...props.add
			}}
		>
			{props.children}
		</div>
	);
	if (props.link) {
		return <Link to={props.linkTo}>{template}</Link>;
	}

	return template;
};

export const firebaseLooper = (snapshot) => {
	const data = [];
	snapshot.forEach((childSnapShot) => {
		data.push({
			...childSnapShot.val(),
			id: childSnapShot.key
		});
	});

	return data;
};

export const reverseArray = (actualArray) => {
	const reversedArray = [];
	for (let i = actualArray.length - 1; i >= 0; i--) {
		reversedArray.push(actualArray[i]);
	}

	return reversedArray;
};

export const validate = (element) => {
	let validationResult = {
		isValid: true,
		errorMessage: ''
	};

	if (element.validation.required && element.value.trim() === '') {
		validationResult = { ...validationResult, isValid: false, errorMessage: 'This field is required.' };
		return validationResult;
	}

	if (element.validation.email && !emailRegex.test(element.value)) {
		validationResult = { ...validationResult, isValid: false, errorMessage: 'Must be a valid email.' };
		return validationResult;
	}
	return validationResult;
};
