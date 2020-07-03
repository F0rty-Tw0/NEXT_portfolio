import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import axios from 'axios';

class Portfolio extends React.Component {
	//getInitialProps a static async function(that can be called without initiazation) to render the content on server and client side
	//Adding context object so we can get our query
	static async getInitialProps(context) {
		//Defining the post as initial value with let as an empty object so it can be modified later
		let post = {};
		//Getting post ID from oure context query
		const postId = context.query.id;
		//Getting data from an URL using axios then displaying it in a console, and catching an error if there is one and displaying it in console too.
		try {
			const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
			// console.log('Showing awaited Data from axios');
			// console.log('Displaying posts from [id]:');
			// console.log(post);
			post = response.data;
		} catch (error) {
			console.log(error);
		}

		console.log('getInitialProps');
		//Should always return an object this time its a post
		return { post };
	}

	render() {
		//Getting the post data from props
		const { post } = this.props;
		//Loging the props that includes Router, which includes Query
		console.log('Displaying this props from [id] render:');
		console.log(post);
		return (
			<BaseLayout>
				<BasePage>
					<h1 className="title">{post.title}</h1>
					<h2>{post.body}</h2>
				</BasePage>
			</BaseLayout>
		);
	}
}

//Exporting the PortfolioDetail page with Router to get new propreties with props
export default Portfolio;
