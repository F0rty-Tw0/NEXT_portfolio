import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';

const CV = (props) => {
	return (
		<React.Fragment>
			{/* Base Layout - Shared component which has Header */}
			<BaseLayout {...props.auth}>
				<BasePage>
					<h1 className="title"> This is a CV page</h1>
				</BasePage>
			</BaseLayout>
		</React.Fragment>
	);
};
export default CV;
