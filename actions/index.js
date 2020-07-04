import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
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

//Function to use our get posts function
export const useGetPosts = () => {
	//Defining the posts as initial value as array so it can be modified later
	const [ posts, setPosts ] = useState([]);
	//Defining the Error as state
	const [ error, setError ] = useState();
	//Defining the loading state
	const [ loading, setLoading ] = useState(true);

	//Function to retrive our data
	useEffect(() => {
		//Getting data from an API using fetch then storing it to a data as a JSON
		async function getPosts() {
			const res = await fetch('/api/v1/posts');
			const result = await res.json();
			//If we cannot get data, we get an error
			if (res.status !== 200) {
				setError(result);
				//Else we get the data
			} else {
				//Seting data to a state
				setPosts(result);
			}
			//We are not loading any data, then loading gonna be false
			setLoading(false);
		}
		getPosts();
	}, []);

	//Returning the state as an opbject defined as posts, or an error //Should always return an object
	return { posts, error, loading };
};

// export const getSecretDataServer = async (req) => {
// 	//On the server the path should be full (http://host.com/api/v1/secret)
// 	return await axios.get('http://127.0.0.1:3000/api/v1/secret', setAuthHeader(req)).then((response) => response.data);
// };
