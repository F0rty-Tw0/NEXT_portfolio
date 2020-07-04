import React from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import withAuth from '@/components/highOrderComponents/withAuth';

import { getSecretData, getSecretDataServer } from '../actions';

class Secret extends React.Component {
	//Passing initial props to show a value
	async getInitialProps({ req }) {
		//Checking if we are in a browser then getting secretData, if not secretDataServer
		const anotherSecretData = await getSecretData(req);
		console.log(anotherSecretData);
		return { anotherSecretData };
	}

	//Setting our initial value of secretData
	state = {
		secretData: []
	};
	// constructor(props) {
	// 	super();
	// 	this.state = {
	// 		secretData: []
	// 	};
	// }

	//Importing "secret" data from the API
	async componentDidMount() {
		//Using getSecretData functions from /actions to check for jwt token
		const secretData = await getSecretData();

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
export default withAuth()(Secret);
