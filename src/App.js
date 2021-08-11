import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ThemeToggler from './components/ThemeToggler';
import { routes, fallbackRoute } from './routes'

import './App.css';

function App() {

	const routeComponents = routes.map((route, key) => {
    	return <Route path={'/'+route.path} exact={route.exact} component={route.component}/>
	});

	return (
		<div className="App">
			<div className="page--header">
				<h1><a href="https://shawandpartners.com" target="_blank" rel="noreferrer">Shaw&Partners</a> Challenge</h1>
				<ThemeToggler/>
			</div>

			<Router>
				<Switch>
					{routeComponents}
					<Route component={fallbackRoute} />
				</Switch>
			</Router>

			<div className="page--footer">
				<footer>Made by <a href="https://github.com/mjrfornari" target="_blank" rel="noreferrer">Marcos Fornari</a></footer>
			</div>
		</div>
	);
}

export default App;
