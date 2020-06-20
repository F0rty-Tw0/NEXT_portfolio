import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';

//Importing Bootstrap Element - Container from Reactstrap
import { Container } from 'reactstrap';

//Calls everything what is included in SuperComponent
class Index extends React.Component {
	//Lifecycle function Render
	render() {
		return (
			//React.Fragment is used instead of <div /> to hide it from source
			<React.Fragment>
				<BaseLayout>
					{/* Bootstrap Container */}
					<Container />
				</BaseLayout>
			</React.Fragment>
		);
	}
}
export default Index;
