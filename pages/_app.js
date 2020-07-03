import React from 'react';
import auth0 from '../services/auth0';
//Bootstrap CSS (this is first)
import 'bootstrap/dist/css/bootstrap.min.css';
//Styling CSS (this is 2nd so it overrides Bootstrap CSS and we don't need !important)
import './../styles/main.scss';
// import { Authentication } from 'auth0-js';

export default class App extends React.Component {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};
		//Ternary operator to check if the process is in browser then send client auth or server auth
		const user = process.browser ? await auth0.clientAuth() : await auth0.serverAuth(ctx.req);

		// let isAuthenticated;
		// if (process.browser) {
		// 	isAuthenticated = await auth0.clientAuth();
		// } else {
		// 	isAuthenticated = await auth0.serverAuth(ctx.req);
		// }

		// Checking the Authentication of user, and doing for better syntax a double negation on user to make it true
		const auth = { user, isAuthenticated: !!user };

		// let isAuthenticated = false;
		// if (user) {
		// 	isAuthenticated = true;
		// }
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		return { pageProps, auth };
	}
	render() {
		const { Component, pageProps, auth } = this.props;
		return (
			<Component {...pageProps} auth={auth}>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>
			</Component>
		);
	}
}
