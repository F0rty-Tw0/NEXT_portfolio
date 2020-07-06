import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useGetUser } from '@/actions/user';
import Redirect from '@/components/shared/Redirect';
import withAuth from '@/hoc/withAuth';
const Secret = () => {
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
		return (
			//React.Fragment is used instead of <div> or <> to hide it from source
			<React.Fragment>
				{/* Base Layout - Shared component which has user data and loading user state */}
				<BaseLayout user={user} loading={loadingUser}>
					<BasePage className="about-page">
						<h1 className="title"> This is a Secret page </h1>
					</BasePage>
				</BaseLayout>
			</React.Fragment>
		);
	}
};

export default withAuth(Secret);
