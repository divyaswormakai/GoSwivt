import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Overview from './Components/Overview';
import Collections from './Components/Collections';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Navbar />
					<Switch>
						<Route path="/" component={Overview} exact />
						<Route path="/collections" component={Collections} exact />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
