import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import withAuth from '@/hoc/withAuth';

const Admin = ({ user, loadingUser }) => {
	return (
		//React.Fragment is used instead of <div> or <> to hide it from source
		<React.Fragment>
			{/* Base Layout - Shared component which has user data and loading user state */}
			<BaseLayout user={user} loading={loadingUser}>
				<BasePage className="about-page">
					<h1 className="title"> This is an Admin - {user.given_name} </h1>
				</BasePage>
			</BaseLayout>
		</React.Fragment>
	);
};

//Exporting High Order Component into Secret
export default withAuth(Admin)('admin');
