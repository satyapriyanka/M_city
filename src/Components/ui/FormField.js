import React from 'react';

const FormField = ({ id, formData, onChange }) => {
	const displayError = () => {
		return (
			<div className="error_label">
				{formData.validation && !formData.valid ? formData.validationMessage : null}
			</div>
		);
	};

	const renderTemplate = () => {
		let formTemplate = null;

		switch (formData.element) {
			case 'input':
				formTemplate = (
					<div>
						<input id={id} {...formData.config} value={formData.value} onChange={onChange} />
						{displayError()}
					</div>
				);
				break;

			default:
				formTemplate = null;
				break;
		}

		return formTemplate;
	};

	return renderTemplate();
};

export default FormField;
