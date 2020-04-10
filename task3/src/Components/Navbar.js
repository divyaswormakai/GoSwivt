import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Modal from './Modal';
import { ModalBody, ModalFooter } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';
import axios from 'axios';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showLoginModal: false,
			showRegisterModal: false,
			userId: '',
			loggedIn: false,
			email: '',
			password: '',
			confirmPassword: '',
			userName: '',
			name: '',
		};
		this.onChange = this.onChange.bind(this);
		this.onLogin = this.onLogin.bind(this);
		this.onRegister = this.onRegister.bind(this);
	}

	componentDidMount() {
		const user_id = localStorage.getItem('userID');

		if (user_id === 'null' || user_id === null) {
			this.setState({ userId: '' });
			this.setState({ loggedIn: false });
		} else {
			this.setState({ userId: user_id });
			this.setState({ loggedIn: true });
		}
	}

	toggleRegisterModal = () => {
		this.setState({ showRegisterModal: !this.state.showRegisterModal });
	};

	toggleLoginModal = () => {
		this.setState({ showLoginModal: !this.state.showLoginModal });
	};

	logOut = () => {
		localStorage.removeItem('userID');
		window.location.reload();
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onLogin = (s) => {
		s.preventDefault();
		const LogInCredenditals = {
			email: this.state.email,
			password: this.state.password,
		};

		axios
			.post(
				'https://calm-stream-46173.herokuapp.com/user/login',
				LogInCredenditals
			)
			.then((res) => {
				console.log(res.data);
				localStorage.setItem('userID', res.data);
				console.log(localStorage.getItem('userID'));
				// window.location.reload();
			})
			.catch((err) => console.log(err));
	};

	onRegister = (s) => {
		s.preventDefault();

		//Error producing and stuff required
		if (this.state.password === this.state.confirmPassword) {
			const RegisterCredenditals = {
				email: this.state.email,
				password: this.state.password,
				username: this.state.userName,
				name: this.state.name,
			};
			console.log(RegisterCredenditals);

			axios
				.post(
					'https://calm-stream-46173.herokuapp.com/user/register',
					RegisterCredenditals
				)
				.then((res) => {
					console.log(res.data.id);
					localStorage.setItem('userID', res.data.id);
					window.location.reload();
				})
				.catch((err) => console.log(err));
		}
	};

	render() {
		//make a var that checks if the use if logged in or not.
		const { showLoginModal, showRegisterModal, loggedIn } = this.state;
		return (
			<Nav className="row col-md-12">
				<div className="col-md-4 text-center nav-link-div">
					<Link to={'/'} className="nav-link">
						<h3>RestauRANT</h3>
					</Link>
				</div>
				<div className="col-md-4 text-center nav-link-div">
					{loggedIn ? (
						<Link to={'/collections'} className="nav-link">
							<h3>My Collections</h3>
						</Link>
					) : (
						<Link to="" className="nav-link" onClick={this.toggleRegisterModal}>
							<h3>Register</h3>
						</Link>
					)}
				</div>
				<div className="col-md-4 text-center nav-link-div">
					{loggedIn ? (
						<Link to="" className="nav-link" onClick={this.logOut}>
							<h3>Logout</h3>
						</Link>
					) : (
						<Link to="" className="nav-link" onClick={this.toggleLoginModal}>
							<h3>Login</h3>
						</Link>
					)}
				</div>

				{/* Login Modal for simplicity. */}
				{showLoginModal ? (
					<Modal>
						<ModalHeader>
							<h3>Login</h3>
						</ModalHeader>
						<ModalBody>
							<form className="form" onSubmit={this.onLogin} method="post">
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon1">
											Email
										</span>
									</div>
									<input
										type="text"
										className="form-control"
										placeholder="Email"
										aria-label="Email"
										aria-describedby="basic-addon1"
										name="email"
										value={this.state.email}
										onChange={this.onChange}
									/>
								</div>
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon1">
											Password
										</span>
									</div>
									<input
										type="password"
										className="form-control"
										placeholder="Username"
										aria-label="Username"
										aria-describedby="basic-addon1"
										name="password"
										value={this.state.password}
										onChange={this.onChange}
									/>
								</div>
								<div className="form-group">
									<button
										type="submit"
										value="submit"
										className="btn btn-success"
									>
										Login
									</button>
								</div>
							</form>
						</ModalBody>
						<ModalFooter>
							<div>
								<button
									className="btn btn-danger"
									onClick={this.toggleLoginModal}
								>
									Close
								</button>
							</div>
						</ModalFooter>
					</Modal>
				) : null}

				{/* Register Modal */}
				{showRegisterModal ? (
					<Modal>
						<ModalHeader>
							<h3>Register</h3>
						</ModalHeader>
						<ModalBody>
							<form className="form" onSubmit={this.onRegister} method="post">
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon1">
											Full Name
										</span>
									</div>
									<input
										type="text"
										className="form-control"
										placeholder="Full Name"
										aria-label="Full Name"
										aria-describedby="basic-addon1"
										name="name"
										value={this.state.name}
										onChange={this.onChange}
									/>
								</div>
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon1">
											Email
										</span>
									</div>
									<input
										type="email"
										className="form-control"
										placeholder="email"
										aria-label="email"
										aria-describedby="basic-addon1"
										name="email"
										value={this.state.email}
										onChange={this.onChange}
									/>
								</div>
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon1">
											Password
										</span>
									</div>
									<input
										type="password"
										className="form-control"
										placeholder="Password"
										aria-label="Password"
										aria-describedby="basic-addon1"
										name="password"
										value={this.state.password}
										onChange={this.onChange}
									/>
								</div>
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon1">
											Confirm Password
										</span>
									</div>
									<input
										type="password"
										className="form-control"
										placeholder="Confirm Password"
										aria-label="confirmPassword"
										aria-describedby="basic-addon1"
										name="confirmPassword"
										value={this.state.confirmPassword}
										onChange={this.onChange}
									/>
								</div>
								<div className="form-group">
									<button
										type="submit"
										value="submit"
										className="btn btn-success"
									>
										Register
									</button>
								</div>
							</form>
						</ModalBody>
						<ModalFooter>
							<div>
								<button
									className="btn btn-danger"
									onClick={this.toggleRegisterModal}
								>
									Close
								</button>
							</div>
						</ModalFooter>
					</Modal>
				) : null}
			</Nav>
		);
	}
}

export default Navbar;
