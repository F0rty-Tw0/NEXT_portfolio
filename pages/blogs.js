import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useGetUser } from '@/actions/user';

const Blogs = () => {
	//Retrieving data, and loading state from useGetUser
	const { data, loading } = useGetUser();

	return (
		//React.Fragment is used instead of <div> or <> to hide it from source
		<React.Fragment>
			{/* Base Layout - Shared component which has user data and loading state */}
			<BaseLayout user={data} loading={loading}>
				{/* Base Layout - Shared component which has user data and loading state */}
				<BasePage>
					<h1 className="title"> This is a Blogs page(Class Component)</h1>
				</BasePage>
			</BaseLayout>
		</React.Fragment>
	);
};
export default Blogs;
