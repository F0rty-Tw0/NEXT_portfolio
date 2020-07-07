import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { withAuth } from '@/utils/auth0';

const AdminSSR = ({ user, title }) => {
	return (
		//React.Fragment is used instead of <div> or <> to hide it from source
		<React.Fragment>
			{/* Base Layout - Shared component which has user data and loading user state */}
			<BaseLayout user={user} loading={false}>
				<BasePage className="about-page">
					<h1 className="title"> This is a Admin SSR - {user && user.given_name} </h1>
					<h2> {title}</h2>
				</BasePage>
			</BaseLayout>
		</React.Fragment>
	);
};

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
})('admin');

//Exporting High Order Component into Secret
export default AdminSSR;
