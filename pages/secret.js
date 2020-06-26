import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/highOrderComponents/withAuth';

import axios from 'axios';

class Secret extends React.Component {
	//Passing initial props to show a value
	static getInitialProps() {
		const superSecretValue = 'Super Secret Value';
		return { superSecretValue };
	}

	//Setting our initial value of secretData
	constructor(props) {
		super();
		this.state = {
			secretData: []
		};
	}

	//Importing "secret" data from the API
	async componentDidMount() {
		const res = await axios.get('/api/v1/secret');
		const secretData = res.data;

		//Asigning a state to secretData
		this.setState({
			secretData
		});
	}

	displaySecretData() {
		//We get our secretData from this.state
		const { secretData } = this.state;
		// Checking if we have secretData and if it has any array, and returning an iterated array
		if (secretData && secretData.length > 0) {
			//map() function will iterate through secretData and will return a new array
			return secretData.map((data, index) => {
				return (
					<div key={index}>
						<p>{data.title}</p>
						<p>{data.description}</p>
					</div>
				);
			});
		}
		return null;
	}

	//Using High Order Component which will return our component with additional functionality
	render() {
		const { superSecretValue } = this.props;
		console.log(this.state);
		return (
			<React.Fragment>
				{/* Base Layout - Shared component which has Header */}
				<BaseLayout {...this.props.auth}>
					<BasePage>
						<h1 className="title"> This is a Secret page</h1>
						<p>{superSecretValue}</p>
						{/* Displaying our Secret Data function */}
						{this.displaySecretData()}
					</BasePage>
				</BaseLayout>
			</React.Fragment>
		);
	}
}

//Exporting withAuth we provide props from withAuth component
export default withAuth(Secret);
