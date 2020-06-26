import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/highOrderComponents/withAuth';

class Secret extends React.Component {
	//Passing initial props to show a value
	static getInitialProps() {
		const superSecretValue = 'Super Secret Value';
		return { superSecretValue };
	}
	//Using High Order Component which will return our component with additional functionality
	render() {
		const { superSecretValue } = this.props;
		return (
			<React.Fragment>
				{/* Base Layout - Shared component which has Header */}
				<BaseLayout {...this.props.auth}>
					<BasePage>
						<h1 className="title"> This is a Secret page</h1>
						<p>{superSecretValue}</p>
					</BasePage>
				</BaseLayout>
			</React.Fragment>
		);
	}
}

//Exporting withAuth we provide props from withAuth component
export default withAuth(Secret);
