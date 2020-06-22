import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

class CV extends React.Component {
	render() {
		return (
			<React.Fragment>
				{/* Base Layout - Shared component which has Header */}
				<BaseLayout>
					<BasePage>
						<h1 className="title"> This is a CV page</h1>
					</BasePage>
				</BaseLayout>
			</React.Fragment>
		);
	}
}
export default CV;
