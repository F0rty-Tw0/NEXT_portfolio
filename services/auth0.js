import auth0 from 'auth0-js';

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

	setSession() {
		//Save Tokens
	}
	login() {
		this.auth0.authorize();
	}
}
//Creating an instance of this Class
const auth0Client = new Auth0();
export default auth0Client;
