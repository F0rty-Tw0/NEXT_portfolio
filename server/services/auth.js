//Hardcoded Middleware
exports.checkJWT = function(req, res, next) {
	const isValidToken = false;
	//Checking if the token is true
	if (isValidToken) {
		//Executing next function
		next();
	} else {
		//Else returning an error
		return res.status(401).send({ title: 'Not Authorized', detail: 'Please Login in order to retrive this data' });
	}
};
