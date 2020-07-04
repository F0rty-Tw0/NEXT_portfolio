import React from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';

//Our webpage
const namespace = 'http://127.0.0.1:3000/';

//Creating a function with Component (our page) as argument and imported role
export default (role) => (Component) =>
	//Returning withAtuh Component
	class withAuth extends React.Component {
		//Asigning getInitialProps because it might be used from other components that are runing within withAuth
		static async getInitialProps(args) {
			//Checking if our Component has a function getInitialProps, if it has we execute it
			const pageProps = (await Component.getInitialProps) && (await Component.getInitialProps(args));
			return { ...pageProps };
		}
		//A function to check if we are authenticated then return a secret page, otherwise other page
		renderSecretPage() {
			//From props we get isAuthenticated and user
			const { isAuthenticated, user } = this.props.auth;
			//Checking if we have an user on ourpage/role
			const userRole = user && user[`${namespace}role`];
			let isAuthorized = false;

			//If we don't have a role, we expect our user to be authorized
			if (role) {
				//If user role is same as role then we assign the authorization to true
				if (userRole && userRole === role) {
					isAuthorized = true;
				}
				//else assign the authorization to true
			} else {
				isAuthorized = true;
			}
			//Not authenticated message
			if (!isAuthenticated) {
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
				//Not authorized message
			} else if (!isAuthorized) {
				return (
					<React.Fragment>
						{/* Base Layout - Shared component which has Header */}
						<BaseLayout {...this.props.auth}>
							<BasePage>
								<h1 className="title"> You have to be authorized to access this content</h1>
							</BasePage>
						</BaseLayout>
					</React.Fragment>
				);
			} else {
				return <Component {...this.props} />;
			}
		}

		render() {
			//Forwarding this.props and destructirizing them so our page can use it
			return this.renderSecretPage();
		}
	};
