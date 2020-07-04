import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';

const Blogs = (props) => {
	return (
		<BaseLayout {...props.auth}>
			<BasePage>
				<h1 className="title"> This is a Blogs page(Class Component)</h1>
			</BasePage>
		</BaseLayout>
	);
};
export default Blogs;
