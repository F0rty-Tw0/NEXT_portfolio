//High Order Component - HOC
//Simple function that takes a component and returns new component with some extended functionality
import Redirect from '@/components/shared/Redirect';
import { useGetUser } from '@/actions/user';
import { isAuthorized } from '@/utils/auth0';

//Simplified way to write, not realy friendly readable
// const withAuth = (Component) => (props) => <Component {...props} />;

//Authorization function with admin check
const withAuth = (Component) => (role) => {
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
			return <Redirect ssr to="/api/v1/login" />;
			//Else we show this content
		} else {
			//Checking if user has metadata which includes the role and if it doesnt then redirect to login page
			if (role && !isAuthorized(user, role)) {
				//Redirect component
				return <Redirect ssr to="/api/v1/login" />;
			}
			//Return the layout
			return <Component user={user} userLoading={loadingUser} {...props} />;
		}
	};
};
export default withAuth;
