import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { decode } from 'punycode';

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

	async getJWKS() {
		//Sinding the synchronized request to our domain
		const res = await axios.get('https://dev-74smgeq4.eu.auth0.com/.well-known/jwks.json');
		//Extacting it from response
		const jwks = res.data;
		return jwks;
	}

	//Better Token authentication for client side (more secure)
	async verfiyToken(token) {
		if (token) {
			//This will decode our token with jwt
			const decodedToken = jwt.decode(token, { complete: true });
			//Checking if there is no decoding token, we return undefined
			if (!decodedToken) {
				return undefined;
			}
			const jwks = await this.getJWKS();
			const jwk = jwks.keys[0];

			//Building the Certificate
			//Accessing first property of x5c
			let cert = jwk.x5c[0];
			console.log(cert);
			//Matching our certificate wtih the regex first 64 caracters and adding (join) a new line to them
			cert = cert.match(/.{1,64}/g).join('\n');
			//Adding -----this----- strings to begining of the certificate and to the end of certificate
			cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
			//Comparing the kid property of our token and public key that we are getting from cert key
			if (jwk.kid === decodedToken.header.kid) {
				try {
					//Verifying our token
					const verifiedToken = jwt.verify(token, cert);
					//This is the experation time
					const expiresAt = verifiedToken.exp * 1000;
					//We check if we have decodedToken and our new date is less than expiresAt, then we return a decodedToken otherwise undefined
					return verifiedToken && new Date().getTime() < expiresAt ? verifiedToken : undefined;
				} catch (err) {
					return undefined;
				}
			}
		}
		return undefined;
	}

	//Authenticaton on ClientSide
	async clientAuth() {
		const token = Cookies.getJSON('jwt');
		//Because getJWKS uses async, we use here async too
		const verifedToken = await this.verfiyToken(token);
		return verifedToken;
	}

	//Authenticaton on ServerSide, adding request which is located in ctx, which can allow us to get cookies from the server request object
	async serverAuth(req) {
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
			const verifiedToken = await this.verfiyToken(token);
			return verifiedToken;
		}
		return undefined;
	}
}
//Creating an instance of this Class
const auth0Client = new Auth0();
export default auth0Client;
