import { initAuth0 } from '@auth0/nextjs-auth0';
// import config from './config';

export default initAuth0({
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
