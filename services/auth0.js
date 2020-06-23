import auth0 from 'auth0-js';
import Cookies from 'js-cookie';

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
		this.isAuthenticated = this.isAuthenticated.bind(this);
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

	//Authentication checker middleware
	isAuthenticated() {
		//Check whether the current time is past the
		//Access Token's expire time
		const expiresAt = Cookies.getJSON('expiresAt');
		return new Date().getTime() < expiresAt;
	}

	//Authenticaton on ClientSide
	clientAuth() {
		return this.isAuthenticated();
	}

	//Authenticaton on ServerSide, adding request which is located in ctx, which can allow us to get cookies from the server request object
	serverAuth(req) {
		//Checking for the cookies
		if (req.headers.cookie) {
			//Spliting cookies string with semicolons (;), we search for a string that start with expiresAt=
			const expiresAtCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith('expiresAt='));

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
			if (!expiresAtCookie) {
				return undefined;
			}
			//Getting expiresAt which will be a date, we want to split by equal sign, we will get an array with a second elemnt a date
			const expiresAt = expiresAtCookie.split('=')[1];
			return new Date().getTime() < expiresAt;
		}
	}
}
//Creating an instance of this Class
const auth0Client = new Auth0();
export default auth0Client;
