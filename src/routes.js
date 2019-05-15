import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';

import './Resources/css/app.css';
import Home from './Components/Home';

const Routes = () => {
	return (
		<Layout>
			<Switch>
				<Route path="/" exact component={Home} />
			</Switch>
		</Layout>
	);
};

export default Routes;
