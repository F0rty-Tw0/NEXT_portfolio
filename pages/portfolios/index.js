import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useGetPosts } from '@/actions';
import { useGetUser } from '@/actions/user';
import Link from 'next/link';

const Portfolios = () => {
	//Getting data, error, and loading state from SWR( wich is defined in useGetPosts )
	const { data, error, loading } = useGetPosts();
	//Retrieving data as dataUser, and loading state as loadingUser from useGetUser
	const { data: dataUser, loading: loadingUser } = useGetUser();

	//A function to iterate(loop) between posts to display them all
	const renderPosts = (posts) =>
		posts.map((justOnePost, index) => {
			return (
				//Adding an unique key for every single post in our case its index of each iterated element
				<li className="portfolio_links" key={index}>
					<Link as={`/portfolios/${justOnePost.id}`} href="/portfolios/[id]">
						<a className="">{justOnePost.title}</a>
					</Link>
				</li>
			);
		});
	return (
		<BaseLayout user={dataUser} loading={loadingUser}>
			<BasePage>
				<h1 className="title"> This is a Portfolios page</h1>
				{/* Displaying the loading state */}
				{loading && <p>Loading Data</p>}
				{/* Displaying an error message if there are some problems loading the data */}
				{error && <div className="alert alert-danger w-25">{error.message}</div>}
				{/* Getting the value from posts, and showing them on page */}
				{data && <ul>{renderPosts(data)}</ul>}
			</BasePage>
		</BaseLayout>
	);
};

export default Portfolios;
