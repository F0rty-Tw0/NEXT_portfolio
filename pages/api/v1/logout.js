import auth0 from '@/utils/auth0';

//Auth0 login function, handling the logout of the users
export default async function logout(req, res) {
	try {
		await auth0.handleLogout(req, res);
	} catch (error) {
		console.error(error);
		res.status(error.status || 400).end(error.message);
	}
}
