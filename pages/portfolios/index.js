import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import Link from 'next/link';
import { useGetPosts } from '@/actions';

const Portfolios = (props) => {
	//Getting destructurized posts from props
	const { posts, error } = useGetPosts();

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
		<BaseLayout {...props.auth}>
			<BasePage>
				<h1 className="title"> This is a Portfolios page(Class Component)</h1>
				{/* Getting the value from posts */}
				{posts && <ul>{renderPosts(posts)}</ul>}
				{error && <div className="alert alert-danger w-25">{error.message}</div>}
			</BasePage>
		</BaseLayout>
	);
};

export default Portfolios;
