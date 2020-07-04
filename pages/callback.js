import React from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { withRouter } from 'next/router';

import auth0Client from '../services/auth0';

class Callback extends React.Component {
	//We need to check if atuhentication was done so we can redirect the user
	async componentDidMount() {
		await auth0Client.handleAuthentication();
		//We want to push to an empty route, to redirect to our homepage
		this.props.router.push('/');
	}

	render() {
		return (
			<BaseLayout>
				<BasePage>
					<h1 className="title">Verifying login data</h1>
				</BasePage>
			</BaseLayout>
		);
	}
}
//Exporting with withRouter so we can use a redirect functionality
export default withRouter(Callback);
