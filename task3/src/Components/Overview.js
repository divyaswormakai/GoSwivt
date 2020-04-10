import React from 'react';
import axios from 'axios';
import './style.css';

class Overview extends React.Component {
	constructor(props) {
		super(props);
		this.state = { restaurants: [], search: '', originalList: [] };
	}

	componentDidMount() {
		axios
			.get('https://calm-stream-46173.herokuapp.com/restaurant/all')
			.then((res) => {
				this.setState({
					restaurants: res.data,
					originalList: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	ShowRestaurants = () => {
		const restaurants = this.state.restaurants;
		restaurants.map((elem) => {
			return <div className="row">{elem.name}</div>;
		});
	};

	onSearch = (s) => {
		s.preventDefault();
		var tempList = [];
		this.state.restaurants.map((elem) => {
			if (elem.name.search(this.state.search.toString()) !== -1) {
				console.log(elem.name);
				tempList.push(elem);
			}
		});

		this.setState({ restaurants: tempList });
	};

	setDefault = (s) => {
		s.preventDefault();
		this.setState({ restaurants: this.state.originalList });
	};

	render() {
		return (
			<>
				{/* {this.ShowRestaurants} */}
				<div className="row">
					<form
						className="form row col-md-12"
						onSubmit={this.onSearch}
						method="get"
					>
						<div className="md-form active-cyan-2 mb-3 col-md-8">
							<input
								className="form-control searchbar"
								type="text"
								placeholder="Enter the name of restaurant"
								aria-label="Search"
								name="search"
								value={this.state.search}
								onChange={this.onChange}
							/>
						</div>
						<div className="col-md-2">
							<button
								className="btn btn-outline-info"
								type="submit"
								value="submit"
							>
								Search
							</button>
						</div>
						<div className="col-md-2">
							<button
								className="btn btn-outline-info"
								onClick={this.setDefault}
							>
								Clear
							</button>
						</div>
					</form>
				</div>
				<table className="table table-striped table-bordered">
					<tr>
						<th width="30%">Name</th>
						<th width="70%">
							Open-time: Mon, Tues, Wednes, Thurs, Fri, Sat, Sun
						</th>
					</tr>
					<tbody>
						{this.state.restaurants.map((elem) => {
							return (
								<tr key={elem._id}>
									<td>
										<b>{elem.name}</b>
									</td>
									<td>{elem.time}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</>
		);
	}
}

export default Overview;
