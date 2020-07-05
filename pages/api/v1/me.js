import auth0 from '@/utils/auth0';

//Auth0 Callback function, retrieving an user Profile data
export default async function callback(req, res) {
	try {
		await auth0.handleProfile(req, res);
	} catch (error) {
		console.error(error);
		res.status(error.status || 400).end(error.message);
	}
}
