import axios from 'axios';
import Cookies from 'js-cookie';
import useSWR from 'swr';
import { getCookieFromReq } from '../helpers/utils';

//Fetcher function from docs of SWR - which results into data we need
const fetcher = (url) =>
	fetch(url).then(async (res) => {
		const result = await res.json();
		if (res.status !== 200) {
			return Promise.reject(result);
		} else {
			return result;
		}
	});

export const useGetPosts = () => {
	const { data, error, ...rest } = useSWR('/api/v1/posts', fetcher);
	return { data, error, loading: !data && !error, ...rest };
};

export const useGetPostsById = (id) => {
	const { data, error, ...rest } = useSWR(id ? `/api/v1/posts/${id}` : null, fetcher);
	return { data, error, loading: !data && !error, ...rest };
};

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

//Function to use our get Data function
// export const useGetData = (url) => {
// 	//Defining the data as initial value as array so it can be modified later
// 	const [ data, setData ] = useState();
// 	//Defining the Error as state
// 	const [ error, setError ] = useState();
// 	//Defining the loading state
// 	const [ loading, setLoading ] = useState(true);

// 	//Function to retrive our data
// 	useEffect(() => {
// 		//Getting data from an API using fetch then storing it to a data as a JSON
// 		async function fetchData() {
// 			//Fetching data from an url defined in useGetData
// 			const res = await fetch(url);
// 			const result = await res.json();
// 			//If we cannot get data, we get an error
// 			if (res.status !== 200) {
// 				setError(result);
// 				//Else we get the data
// 			} else {
// 				//Seting data to a state
// 				setData(result);
// 			}
// 			//We are not loading any data, then loading gonna be false
// 			setLoading(false);
// 		}
// 		url && fetchData();
// 	}, [url]);

// 	//Returning the state as an object defined as data, or an error, or loading //Should always return an object
// 	return { data, error, loading };
// };

// export const getSecretDataServer = async (req) => {
// 	//On the server the path should be full (http://host.com/api/v1/secret)
// 	return await axios.get('http://127.0.0.1:3000/api/v1/secret', setAuthHeader(req)).then((response) => response.data);
// };
