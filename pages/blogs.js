import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

class Blogs extends React.Component {
	render() {
		return (
			<BaseLayout>
				<BasePage>
					<h1 className="title"> This is a Blogs page(Class Component)</h1>
				</BasePage>
			</BaseLayout>
		);
	}
}
export default Blogs;
