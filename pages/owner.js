import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import withAuth from '../components/highOrderComponents/withAuth';
class Owner extends React.Component {
	render() {
		return (
			<React.Fragment>
				{/* Base Layout - Shared component which has Header */}
				<BaseLayout {...this.props.auth}>
					<BasePage>
						<h1 className="title"> This is an Owner page</h1>
					</BasePage>
				</BaseLayout>
			</React.Fragment>
		);
	}
}

//Setting a role 'siteOwner' to the function argument role
const withSpecificAuth = withAuth('siteOwner')

export default withSpecificAuth(Owner);
