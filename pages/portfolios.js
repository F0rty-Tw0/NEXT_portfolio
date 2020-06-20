import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import Link from 'next/link';
//Duplicating the axios use from the Index, its better to have it somewhere centralized where we can use it
import axios from 'axios';

class Portfolios extends React.Component {
	//getInitialProps a static async function(that can be called without initiazation) to render the content on server and client side
	static async getInitialProps() {
		//Defining the posts as initial value with let as array so it can be modified later
		let posts = [];
		//Getting data from an URL using axios then displaying it in a console, and catching an error if there is one and displaying it in console too.
		try {
			const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
			posts = response.data;
			// console.log('Showing awaited Data from axios');
			// console.log(posts);
		} catch (error) {
			console.log(error);
		}

		console.log('getInitialProps');
		//Should always return an object
		//Showing the spliced posts from 0 index until 10 index
		return { posts: posts.splice(0, 10) };
	}

	//A function to iterate(loop) between posts to display them all
	renderPosts(posts) {
		return posts.map((justOnePost, index) => {
			return (
				//Adding an unique key for every single post in our case its index of each iterated element
				<li key={index}>
					{/* Adding a link to the data independently and adding a query parameter to it */}
					<Link as={`/portfolioDetail/${justOnePost.id}`} href="/portfolioDetail/[id]">
						<a className="">{justOnePost.title}</a>
					</Link>
				</li>
			);
		});
	}

	render() {
		//Consoling the posts data
		console.log(this.props);
		//Getting destructurized posts from props
		const { posts } = this.props;
		return (
			<BaseLayout>
				<h1 className="title"> This is a Portfolios page(Class Component)</h1>
				{/* Getting the value from posts */}
				<ul>{this.renderPosts(posts)}</ul>
			</BaseLayout>
		);
	}
}
export default Portfolios;
