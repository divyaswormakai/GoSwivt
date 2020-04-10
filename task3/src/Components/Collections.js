import React from 'react';
import axios from 'axios';
import './style.css';
import Modal from './Modal';
import { ModalBody, ModalFooter } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';

class Collections extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collections: [],
			userID: '',
			showModal: false,
			collectionName: '',
			currentCollectionID: '',
		};
	}

	componentDidMount() {
		this.setState({ userID: localStorage.getItem('userID') });
		axios
			.get(
				'https://calm-stream-46173.herokuapp.com/collections/CollectionRoute/list/' +
					localStorage.getItem('userID')
			)
			.then((res) => {
				this.setState({
					collections: res.data,
				});
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	toggleModal = () => {
		this.setState({ showModal: !this.state.showModal });
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = (s) => {
		s.preventDefault();
		const collectionDetails = {
			name: this.state.collectionName,
			users: [this.state.userID],
			restaurants: [],
		};
		console.log(collectionDetails);
		axios
			.post(
				'https://calm-stream-46173.herokuapp.com/collections/CollectionRoute/addCollection',
				collectionDetails
			)
			.then((res) => {
				console.log(res);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	editCollection = () => {};

	deleteCollection = () => {
		console.log(this.state.currentCollectionID);
	};

	render() {
		return (
			<>
				<div className="col-md-12">
					<div className="row">
						<button
							className="btn btn-outline-success"
							onClick={this.toggleModal}
						>
							Add a New Collection
						</button>
					</div>
				</div>
				<br />
				<br />
				{this.state.collections.map((collection) => {
					return (
						<div className="row col-md-12">
							<b>{collection.name}</b>
							{/* Add edit and delete buttons */}
						</div>
					);
				})}
				{this.state.showModal ? (
					<Modal>
						<ModalHeader>
							<h3>Name your collection</h3>
						</ModalHeader>
						<ModalBody>
							<form className="form" onSubmit={this.onSubmit} method="post">
								<div className="input-group mb-3">
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon1">
											Collection-Name
										</span>
									</div>
									<input
										type="text"
										className="form-control"
										placeholder="Name of your collection"
										aria-label="Email"
										aria-describedby="basic-addon1"
										name="collectionName"
										value={this.state.collectionName}
										onChange={this.onChange}
									/>
								</div>
								<div className="form-group">
									<button
										type="submit"
										value="submit"
										className="btn btn-success"
									>
										Submit
									</button>
								</div>
							</form>
						</ModalBody>
						<ModalFooter>
							<div>
								<button className="btn btn-danger" onClick={this.toggleModal}>
									Close
								</button>
							</div>
						</ModalFooter>
					</Modal>
				) : null}
			</>
		);
	}
}

export default Collections;
