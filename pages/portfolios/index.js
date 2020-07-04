import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useEffect } from 'react';
import Link from 'next/link';
//Duplicating the axios use from the Index, its better to have it somewhere centralized where we can use it
import axios from 'axios';

const Portfolios = (props) => {
	useEffect(() => {
		async function getPosts() {
			const res = await fetch('/api/v1/posts');
			const data = await res.json();			
		}
		getPosts();
	}, []);
	//Getting destructurized posts from props
	const { posts } = props;
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
				<ul>{renderPosts(posts)}</ul>
			</BasePage>
		</BaseLayout>
	);
};
//getInitialProps a static async function(that can be called without initiazation) to render the content on server and client side
Portfolios.getInitialProps = async () => {
	//Defining the posts as initial value with let as array so it can be modified later
	let posts = [];
	//Getting data from an URL using axios then displaying it in a console, and catching an error if there is one and displaying it in console too.
	try {
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
		posts = response.data;
		// console.log('Showing awaited Data from axios');
		// console.log(posts);
	} catch (error) {
		console.error(error);
	}

	//Should always return an object
	//Showing the spliced posts from 0 index until 10 index
	return { posts: posts.splice(0, 10) };
};

export default Portfolios;
