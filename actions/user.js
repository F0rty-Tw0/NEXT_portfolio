import useSWR from 'swr';
import { fetcher } from '@/actions';

//Function to export data from Users
export const useGetUser = () => {
	//Defining data, error and everything else with SWR library,  route and fetcher function
	const { data, error, ...rest } = useSWR('/api/v1/me', fetcher);
	//Returning Data, Error, and loading status, if there is no data and no error
	return { data, error, loading: !data && !error, ...rest };
};
