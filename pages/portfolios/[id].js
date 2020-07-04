import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useGetData } from '@/actions';
import { useRouter } from 'next/router';

const Portfolio = () => {
	const router = useRouter();
	//Getting data, error, and loading state from useGetData( and our api link)
	const { data: portfolio, error, loading } = useGetData(router.query.id ? `/api/v1/posts/${router.query.id}` : null);
	debugger;
	return (
		<BaseLayout>
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
	);
};

//getInitialProps a static async function(that can be called without initiazation) to render the content on server and client side
//Adding query object so we can get our query
// Portfolio.getInitialProps = async (query) => {
// 	//Defining the post as initial value with let as an empty object so it can be modified later
// 	let post = {};
// 	//Getting post ID from our query
// 	const postId = query.query.id;
// 	//Getting data from an URL using axios then displaying it in a console, and catching an error if there is one and displaying it in console too.
// 	try {
// 		const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
// 		// console.log('Showing awaited Data from axios');
// 		// console.log('Displaying posts from [id]:');
// 		// console.log(post);
// 		post = response.data;
// 	} catch (error) {
// 		console.log(error);
// 	}

// 	//Should always return an object this time its a post
// 	return { post };
// };

//Exporting the PortfolioDetail page with Router to get new propreties with props
export default Portfolio;
