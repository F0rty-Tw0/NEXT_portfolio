import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import auth0 from '@/utils/auth0';

const SecretSSR = ({ user }) => {
	return (
		//React.Fragment is used instead of <div> or <> to hide it from source
		<React.Fragment>
			{/* Base Layout - Shared component which has user data and loading user state */}
			<BaseLayout user={user} loading={false}>
				<BasePage className="about-page">
					<h1 className="title"> This is a Secret - {user && user.given_name} </h1>
				</BasePage>
			</BaseLayout>
		</React.Fragment>
	);
};

//Server side function - to get data from a server
export const getServerSideProps = async ({ req, res }) => {
	//Gettin a session from auth0 function
	const session = await auth0.getSession(req);
	//If we have a session or we have a session user
	if (!session || !session.user) {
		//Response 302 - which means redirect to 'Location'
		res.writeHead(302, {
			Location: '/api/v1/login'
		});
		//Notify server that the response should end
		res.end();
		//And return an empty props
		return { props: {} };
	}
	//Otherwise we should be authenticated, and we will return the User
	return {
		props: { user: session.user }
	};
};
//Exporting High Order Component into Secret
export default SecretSSR;
