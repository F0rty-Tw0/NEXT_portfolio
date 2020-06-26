import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

class Secret extends React.Component {
	//A function to check if we are authenticated then return a secret page, otherwise other page
	renderSecretPage() {
		const { isAuthenticated } = this.props.auth;
		if (isAuthenticated) {
			return (
				<React.Fragment>
					{/* Base Layout - Shared component which has Header */}
					<BaseLayout {...this.props.auth}>
						<BasePage>
							<h1 className="title"> This is a Secret page</h1>
						</BasePage>
					</BaseLayout>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					{/* Base Layout - Shared component which has Header */}
					<BaseLayout {...this.props.auth}>
						<BasePage>
							<h1 className="title"> You have to Login to access this content</h1>
						</BasePage>
					</BaseLayout>
				</React.Fragment>
			);
		}
	}
	render() {
		return this.renderSecretPage();
	}
}
export default Secret;
