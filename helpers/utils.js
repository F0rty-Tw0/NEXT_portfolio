export const getCookieFromReq = (req, cookieKey) => {
	//Spliting cookies string with semicolons (;), we search for a string that start with jwt=
	const cookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith(`${cookieKey}=`));
	//Checking if we don't have a Cookie then we returning undefined
	if (!cookie) {
		return undefined;
	}
	//Getting a token which will be a date, we want to split by equal sign, we will get an array with a second elemnt a date
	return cookie.split('=')[1];
};
