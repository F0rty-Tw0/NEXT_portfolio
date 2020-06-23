import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
class Auth0 {
	//Creating a constructor to intialize this steps
	constructor() {
		this.auth0 = new auth0.WebAuth({
			domain: 'dev-74smgeq4.eu.auth0.com',
			clientID: '9A3Dcg4b9NJZQ1GfqpsOpp9iQny1JHy0',
			redirectUri: 'http://127.0.0.1:3000/callback',
			responseType: 'token id_token',
			//Providing profile for showing more information about the user
			scope: 'openid profile'
		});

		//Binding this context to Auth0 Class
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);
	}
	handleAuthentication() {
		return new Promise((resolve, reject) => {
			this.auth0.parseHash((err, authResult) => {
				if (authResult && authResult.accessToken && authResult.idToken) {
					this.setSession(authResult);
					resolve();
				} else if (err) {
					reject(err);
					console.log(err);
				}
			});
		});
	}

	setSession(authResult) {
		debugger;
		//Set the time that the Access Token will expire at
		const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
		// localStorage.setItem('access_token', authResult.accessToken);
		// localStorage.setItem('id_token', authResult.idToken);
		// localStorage.setItem('expires_at', authResult.expiresAt);

		//Setting our session in cookies using js-cookie
		Cookies.set('user', authResult.idTokenPayload);
		Cookies.set('jwt', authResult.idToken);
		Cookies.set('expiresAt', expiresAt);
	}

	//Login function
	login() {
		this.auth0.authorize();
	}

	//Logout function
	logout() {
		Cookies.remove('user');
		Cookies.remove('jwt');
		Cookies.remove('expiresAt');

		this.auth0.logout({
			returnTo: '',
			clientID: '9A3Dcg4b9NJZQ1GfqpsOpp9iQny1JHy0'
		});
	}

	//Better Token authentication for client side (more secure)
	verfiyToken(token) {
		if (token) {
			//This will decode our token with jwt
			const decodedToken = jwt.decode(token);
			//This is the experation time
			const expiresAt = decodedToken.exp * 1000;
			//We check if we have decodedToken and our new date is less than expiresAt, then we return a decodedToken otherwise undefined
			return decodedToken && new Date().getTime() < expiresAt ? decodedToken : undefined;
		}
		return undefined;
	}

	//Authenticaton on ClientSide
	clientAuth() {
		const token = Cookies.getJSON('jwt');
		const verifedToken = this.verfiyToken(token);
		return token;
	}

	//Authenticaton on ServerSide, adding request which is located in ctx, which can allow us to get cookies from the server request object
	serverAuth(req) {
		//Checking for the cookies
		if (req.headers.cookie) {
			//Spliting cookies string with semicolons (;), we search for a string that start with jwt=
			const tokenCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith('jwt='));

			// //Logging the cookies
			// const cookies = req.headers.cookie;
			// console.log(cookies);
			// const splitedCookies = cookies.split(';');
			// console.log(splitedCookies);
			// const expiresAtCookies = splitedCookies.find((c) => c.trim().startsWith('expiresAt='));
			// console.log(expiresAtCookies);
			// const expiresAtArray = expiresAtCookie.split('=');
			// console.log(expiresAtArray);
			// const expiresAtDate = expiresAtArray[1];
			// console.log(expiresAtDate);

			//Checking if we don't have expiresAtCookie then we returning undefined
			if (!tokenCookie) {
				return undefined;
			}
			//Getting a token which will be a date, we want to split by equal sign, we will get an array with a second elemnt a date
			const token = tokenCookie.split('=')[1];
			const verifiedToken = this.verfiyToken(token);
			return verifiedToken;
		}
		return undefined;
	}
}
//Creating an instance of this Class
const auth0Client = new Auth0();
export default auth0Client;
