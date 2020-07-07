import { initAuth0 } from '@auth0/nextjs-auth0';
// import config from './config';

//Initiazation of auth0 and required data
const auth0 = initAuth0({
	domain: process.env.AUTH0_DOMAIN,
	clientId: process.env.AUTH0_CLIENT_ID,
	clientSecret: process.env.AUTH0_CLIENT_SECRET,
	scope: process.env.AUTH0_SCOPE,
	redirectUri: process.env.AUTH0_REDIRECT_URI,
	postLogoutRedirectUri: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI,
	session: {
		// The secret used to encrypt the cookie.
		cookieSecret: process.env.AUTH0_COOKIE_SECRET
		// The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
	}
});

export default auth0;

//Serverside Authorization function
export const isAuthorized = (user, role) => {
	//Checking if user has metadata which includes the role
	return user && user[process.env.AUTH0_NAMESPACE + '/roles'].includes(role);
};

//Server side Authentication function - to get data from a server
export const authorizeUser = async (req, res) => {
	//Gettin a session from auth0 function
	const session = await auth0.getSession(req);
	//If we have a session or we have a session user
	if (!session || !session.user) {
		//Response 302 - which means redirect to 'Location'
		res.writeHead(302, {
			Location: process.env.AUTH0_REDIRECT_LOGIN
		});
		//Notify server that the response should end
		res.end();
		//And return a null user
		return null;
	}
	//Otherwise we should be authenticated, and we will return the User
	return session.user;
};

//Client side Authentication function
export const withAuth = (getData) => (role) => async ({ req, res }) => {
	//Gettin a session from auth0 function
	const session = await auth0.getSession(req);
	//If we have a session or we have a session user or we are not authorized
	if (!session || !session.user || (role && !isAuthorized(session.user, role))) {
		//Response 302 - which means redirect to 'Location'
		debugger
		res.writeHead(301, {
			Location: process.env.AUTH0_REDIRECT_LOGIN
		});
		//Notify server that the response should end
		await res.end();
		//And return a null user
		return { props: {} };
	}
	const data = getData ? await getData({ req, res }, session.user) : {};
	//Otherwise we should be authenticated, and we will return the User
	return { props: { user: session.user, ...data } };
};
