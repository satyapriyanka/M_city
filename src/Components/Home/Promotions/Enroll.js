import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../ui/FormField';
import { validate } from '../../ui/misc';
import { firebasePromotions } from '../../../firebase';

class Enroll extends Component {
	state = {
		formError: false,
		formSuccess: '',
		formData: {
			email: {
				element: 'input',
				value: '',
				config: {
					name: 'email_input',
					type: 'email',
					placeholder: 'Enter your email',
					autoComplete: 'off'
				},
				validation: {
					required: true,
					email: true
				},
				valid: false,
				validationMessage: ''
			}
		}
	};

	updateForm = (element) => {
		const newFormData = { ...this.state.formData };
		const newElement = { ...newFormData[element.currentTarget.id] };
		newElement.value = element.currentTarget.value;

		let validData = validate(newElement);
		newElement.valid = validData.isValid;
		newElement.validationMessage = validData.errorMessage;

		newFormData[element.currentTarget.id] = newElement;

		this.setState({
			formData: newFormData,
			formError: false
		});
	};

	onFormSubmit(event) {
		event.preventDefault();
		let dataToSubmit = {};
		let isFromValid = true;

		for (let key in this.state.formData) {
			dataToSubmit[key] = this.state.formData[key].value;
			isFromValid = isFromValid && this.state.formData[key].valid;
		}

		if (!isFromValid) {
			this.setState({ formError: true });
			return;
		}

		console.log('Data to SUbmit', dataToSubmit);

		firebasePromotions
			.orderByChild('eamil')
			.equalTo(dataToSubmit.email)
			.once('value')
			.then((snapshot) => {
				return snapshot.val();
			})
			.then((emailExists) => {
				if (!emailExists) {
					return firebasePromotions.push(dataToSubmit).then(() => {
						this.resetFormData(false);
					});
				}
				return this.resetFormData(true);
			});
	}

	resetFormData = (isDuplicate) => {
		let newFormData = { ...this.state.formData };

		for (let key in this.state.formData) {
			newFormData[key].valid = false;
			newFormData[key].value = '';
			newFormData[key].validationMessage = '';
		}

		this.setState({
			formData: newFormData,
			formError: false,
			formSuccess: isDuplicate ? 'Already registered' : 'Congratulations'
		});

		this.clearSuccessMessage();
	};

	clearSuccessMessage = () => {
		setTimeout(() => {
			this.setState({
				formSuccess: ''
			});
		}, 2000);
	};

	render() {
		return (
			<Fade>
				<div className="enroll_wrapper">
					<form onSubmit={(e) => this.onFormSubmit(e)}>
						<div className="enroll_title">Enter your email</div>
						<div className="enroll_input">
							<FormField id="email" formData={this.state.formData.email} onChange={this.updateForm} />
							{this.state.formError ? (
								<div className="error_label">Please fill required fields.</div>
							) : null}
							{this.state.formSuccess ? (
								<div className="success_label">{this.state.formSuccess}</div>
							) : null}
							<button onClick={(event) => this.onFormSubmit(event)}>Enroll</button>
						</div>
					</form>
				</div>
			</Fade>
		);
	}
}

export default Enroll;
