import auth0 from '@/utils/auth0';

//Auth0 Callback function, handling the callback, and redirects us to the index page
export default async function callback(req, res) {
	try {
		await auth0.handleCallback(req, res, { redirectTo: '/' });
	} catch (error) {
		console.error(error);
		res.status(error.status || 400).end(error.message);
	}
}
