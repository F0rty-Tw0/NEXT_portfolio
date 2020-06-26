import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/highOrderComponents/withAuth';

class Secret extends React.Component {
	// //A function to check if we are authenticated then return a secret page, otherwise other page
	// renderSecretPage() {
	// 	const { isAuthenticated } = this.props.auth;
	// 	if (isAuthenticated) {
	// 		return (
	// 			<React.Fragment>
	// 				{/* Base Layout - Shared component which has Header */}
	// 				<BaseLayout {...this.props.auth}>
	// 					<BasePage>
	// 						<h1 className="title"> This is a Secret page</h1>
	// 					</BasePage>
	// 				</BaseLayout>
	// 			</React.Fragment>
	// 		);
	// 	} else {
	// 		return (
	// 			<React.Fragment>
	// 				{/* Base Layout - Shared component which has Header */}
	// 				<BaseLayout {...this.props.auth}>
	// 					<BasePage>
	// 						<h1 className="title"> You have to Login to access this content</h1>
	// 					</BasePage>
	// 				</BaseLayout>
	// 			</React.Fragment>
	// 		);
	// 	}
	// }
	// render() {
	// 	return this.renderSecretPage();
	// }

	// export default Secret;

	//Using High Order Component which will return our component with additional functionality
	render() {
		console.log(this.props);
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
	}
}

//Exporting withAuth we provide props from withAuth component
export default withAuth(Secret);
