import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { authorizeUser, withAuth } from '@/utils/auth0';

const SecretSSR = ({ user, title }) => {
	debugger;
	return (
		//React.Fragment is used instead of <div> or <> to hide it from source
		<React.Fragment>
			{/* Base Layout - Shared component which has user data and loading user state */}
			<BaseLayout user={user} loading={false}>
				<BasePage className="about-page">
					<h1 className="title"> This is a Secret - {user && user.given_name} </h1>
					<h2> {title}</h2>
				</BasePage>
			</BaseLayout>
		</React.Fragment>
	);
};

//Server side function - to get data from a server
// export const getServerSideProps = async ({ req, res }) => {
// 	const user = await authorizeUser(req, res);
// 	//Otherwise we should be authenticated, and we will return the User
// 	return {
// 		props: { user }
// 	};
// };

//Testing function to simulate server data
const getTitle = () => {
	return new Promise((res) => {
		setTimeout(() => {
			res({ title: 'My new Title' });
		}, 500);
	});
};
//Server side function - to get data from a server
export const getServerSideProps = withAuth(async ({ req, res }, user) => {
	const title = await getTitle();
	return title;
});

//Exporting High Order Component into Secret
export default SecretSSR;
