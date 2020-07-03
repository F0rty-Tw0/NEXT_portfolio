import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

const About = (props) => {
	return (
		<React.Fragment>
			{/* Base Layout - Shared component which has Header */}
			<BaseLayout {...props.auth}>
				<BasePage className="about-page">
					<h1 className="title"> This is an About page</h1>
				</BasePage>
			</BaseLayout>
		</React.Fragment>
	);
};
export default About;
