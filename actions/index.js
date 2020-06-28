import axios from 'axios';
import Cookies from 'js-cookie';
import { getCookieFromReq } from '../helpers/utils';

const setAuthHeader = (req) => {
	//Writing jwt token from cookies
	const token = req ? getCookieFromReq(req, 'jwt') : Cookies.getJSON('jwt');
	if (token) {
		//Returning headers authorization - Bearer and the token
		return { headers: { authorization: `Bearer ${token}` } };
	}
	return undefined;
};

//Getting data from our API and checking for authorization
export const getSecretData = async (req) => {
    
	const url = 'http://127.0.0.1:3000/api/v1/secret';
	return await axios.get(url, setAuthHeader(req)).then((response) => response.data);
};

// export const getSecretDataServer = async (req) => {
// 	//On the server the path should be full (http://host.com/api/v1/secret)
// 	return await axios.get('http://127.0.0.1:3000/api/v1/secret', setAuthHeader(req)).then((response) => response.data);
// };
