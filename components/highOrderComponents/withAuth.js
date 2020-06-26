import React from 'react';
import BaseLayout from '../layouts/BaseLayout';
import BasePage from '../BasePage';

//Creating a function with Component (our page) as argument
export default function(Component) {
	//Returning withAtuh Component
	return class withAuth extends React.Component {
		//Asigning getInitialProps because it might be used from other components that are runing within withAuth
		static async getInitialProps(args) {
			//Checking if our Component has a function getInitialProps, if it has we execute it
			const pageProps = (await Component.getInitialProps) && (await Component.getInitialProps(args));
			return { ...pageProps };
		}
		//A function to check if we are authenticated then return a secret page, otherwise other page
		renderSecretPage() {
			const { isAuthenticated } = this.props.auth;
			if (isAuthenticated) {
				return <Component {...this.props} />;
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
			//Forwarding this.props and destructirizing them so our page can use it
			return this.renderSecretPage();
		}
	};
}
