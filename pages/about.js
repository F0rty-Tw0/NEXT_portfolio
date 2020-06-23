import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

class About extends React.Component {
	render() {
		return (
			<React.Fragment>
				{/* Base Layout - Shared component which has Header */}
				<BaseLayout {...this.props.auth}>
					<BasePage className="about-page">
						<h1 className="title"> This is an About page</h1>
					</BasePage>
				</BaseLayout>
			</React.Fragment>
		);
	}
}
export default About;
