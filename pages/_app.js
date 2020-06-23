import App from 'next/app';

//Bootstrap CSS (this is first)
import 'bootstrap/dist/css/bootstrap.min.css';
//Styling CSS (this is 2nd so it overrides Bootstrap CSS and we don't need !important)
import './../styles/main.scss';

export default class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {
		let pageProps = {};
		//Ternary operator to check if the process is in browser then send client auth or server auth
		const isAuthenticated = process.browser ? 'clientAuth()' : 'serverAuth()';
		// let isAuthenticated;
		// if (process.browser) {
		// 	isAuthenticated = 'clientAuth()';
		// } else {
		// 	isAuthenticated = 'serverAuth()';
		// }

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		return { pageProps };
	}
	render() {
		const { Component, pageProps } = this.props;
		return (
			<Component {...pageProps}>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>
			</Component>
		);
	}
}
