import React from 'react';
import { CityLogo } from '../ui/Icons';

const Footer = () => {
	return (
		<footer className="bck_blue">
			<div className="footer_logo">
				<CityLogo link linkTo="/" width="70px" height="70px" />
			</div>
			<div className="footer_discl">Manchester city 2018.All rights reserved</div>
		</footer>
	);
};

export default Footer;
