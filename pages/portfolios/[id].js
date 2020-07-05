import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useGetPostsById } from '@/actions';
import { useRouter } from 'next/router';
import { useGetUser } from '@/actions/user';

const Portfolio = () => {
	const router = useRouter();
	//Getting data, error, and loading state from useGetPostsById( and our api link)
	const { data: portfolio, error, loading } = useGetPostsById(router.query.id);
	//Retrieving data as dataUser, and loading state as loadingUser from useGetUser
	const { data: dataUser, loading: loadingUser } = useGetUser();

	return (
		//React.Fragment is used instead of <div> or <> to hide it from source
		<React.Fragment>
			{/* Base Layout - Shared component which has user data and loading state */}
			<BaseLayout user={dataUser} loading={loadingUser}>
				<BasePage>
					<h1 className="title"> This is a Portfolios page</h1>
					{/* Displaying the loading state */}
					{loading && <p>Loading data</p>}
					{/* Displaying an error message if there are some problems loading the data */}
					{error && <div className="alert alert-danger w-25">{error.message}</div>}
					{/* Getting the value from data: portfolio, and showing it on page */}
					{portfolio && (
						<React.Fragment>
							<h1>{portfolio.title}</h1>
							<h2>{portfolio.body}</h2>
						</React.Fragment>
					)}
				</BasePage>
			</BaseLayout>
		</React.Fragment>
	);
};

export default Portfolio;
