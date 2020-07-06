//High Order Component - HOC
//Simple function that takes a component and returns new component with some extended functionality
import { useGetUser } from '@/actions/user';
import Redirect from '@/components/shared/Redirect';

//Simplified way to write, not realy friendly readable
// const withAuth = (Component) => (props) => <Component {...props} />;

//More usual way to write it
const withAuth = (Component) => {
	return (props) => {
		//Retrieving data, and loading state from useGetUser
		const { data: user, loading: loadingUser } = useGetUser();

		//If the user is loading we show this <p> content
		if (loadingUser) {
			return <p>Loading...</p>;
		}

		//If there is no user we redirect to login page
		if (!user) {
			//Redirect component
			return <Redirect to="/api/v1/login" />;
			//Else we show this content
		} else {
			//Return the layout
			return <Component user={user} userLoading={loadingUser} {...props} />;
		}
	};
};
export default withAuth;
