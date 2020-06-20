import App from 'next/app';

//Bootstrap CSS (this is first)
import 'bootstrap/dist/css/bootstrap.min.css';
//Styling CSS (this is 2nd so it overrides Bootstrap CSS and we don't need !important)
import './../styles/main.scss';

export default class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {
		let pageProps = {};
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		return { pageProps };
	}
	render() {
		const { Component, pageProps } = this.props;
		return <Component {...pageProps} />;
	}
}
