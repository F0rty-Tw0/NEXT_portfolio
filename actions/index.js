import useSWR from 'swr';

//Fetcher function from docs of SWR - which results into data we need
export const fetcher = (url) =>
	fetch(url).then(async (res) => {
		const result = await res.json();
		if (res.status !== 200) {
			return Promise.reject(result);
		} else {
			return result;
		}
	});

//Function to export data from /posts
export const useGetPosts = () => {
	//Defining data, error and everything else with SWR library,  route and fetcher function
	const { data, error, ...rest } = useSWR('/api/v1/posts', fetcher);
	//Returning Data, Error, and loading status, if there is no data and no error
	return { data, error, loading: !data && !error, ...rest };
};

//Function to export data from /posts/:id
export const useGetPostsById = (id) => {
	//Defining data, error and everything else with SWR library,  route and fetcher function
	const { data, error, ...rest } = useSWR(id ? `/api/v1/posts/${id}` : null, fetcher);
	//Returning Data, Error, and loading status, if there is no data and no error
	return { data, error, loading: !data && !error, ...rest };
};
