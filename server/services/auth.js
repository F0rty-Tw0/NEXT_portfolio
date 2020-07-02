const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

//Our webpage
const namespace = 'http://127.0.0.1:3000/';

//Middleware - Checks for a Token in authorisation header, if token is present, it checks its validity
//If its valid it will pass us to next middleware, if its not valid or present it will show an error
exports.checkJWT = jwt({
	//Getting our secret
	secret: jwksRsa.expressJwtSecret({
		cache: true, // Default Value - True
		rateLimit: true,
		jwksRequestPerMinute: 15,
		jwksUri: 'https://dev-74smgeq4.eu.auth0.com/.well-known/jwks.json'
	}),
	audience: '9A3Dcg4b9NJZQ1GfqpsOpp9iQny1JHy0', //ClientID
	issuer: 'https://dev-74smgeq4.eu.auth0.com/', //Domain
	algorithms: [ 'RS256' ]
});

//Middleware - Checks for the user role
exports.checkRole = (role) => (req, res, next) => {
	const user = req.user;
	//If user is availabe and its same with the role that we are getting, we call function next()
	if (user && user[namespace + 'role'] === role) {
		next();
	} else {
		//Else returning an error
		return res
			.status(401)
			.send({ title: 'Not Authorized', detail: 'You are not authorized to get this data' });
	}
};
