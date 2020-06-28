const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

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
