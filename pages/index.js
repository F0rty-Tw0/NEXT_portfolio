import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
// import Header from '../components/shared/Header';

//==================================================
//Functional Component
//==================================================
//Dumb Components
//Get Data
//Return Data
//==================================================
// const Index = function() {
// 	return <h1> This is an Index page</h1>;
// };
//--------------------------------------------------
// const Index = () => {
// 	return <h1> This is an Index page</h1>;
// };
//--------------------------------------------------

//==================================================
//Class Component
//==================================================
//More Functionality
//More Stuff
//User Lifecycle Functions
//==================================================
//Pure React
//==================================================
// class Index extends React.Component {
// 	render() {
//
// 		React.createElement(
// 			'h1',
// 			{
// 				className: 'title'
// 			},
// 			' This is an Index page'
// 		);
// 	}
// }
//--------------------------------------------------

class Index extends React.Component {
	//Lifecycle function Constructor
	constructor() {
		//In Constructor you have to call always Super()
		super();

		//Asigning a state of a title
		this.state = {
			title: 'I am Index Page'
		};
		console.log('constructor');
	}

	//Lifecycle function ComponentDidMount
	componentDidMount() {
		console.log('componentDidMount');
	}

	//Lifecycle function ComponentDidUpdate
	componentDidUpdate() {
		console.log('componentDidUpdate');
	}

	//Lifecycle function ComponentWillUnmount
	componentWillUnmount() {
		console.log('componentWillUnmount');
	}

	//Update Title function to Update the state
	updateTitle() {
		this.setState({ title: 'I am Updated Index Page' });
	}

	//Lifecycle function Render
	render() {
		console.log('render');
		return (
			//React.Fragment is used instead of <div /> to hide it from source
			<React.Fragment>
				<BaseLayout>
					{/* //Shared Header Component with defined props(title)*/}
					{/*<Header title={'I am a Header Component'}>*/}
					{/* //Child props deffinition here */}
					{/*<h1 className="title">I am Header Subtitle</h1>*/}
					{/*</Header>*/}
					<h1 className="title"> This is an Index page(Class Component)</h1>
					<h1 className="title"> {this.state.title}</h1>
					{/* Calling updateTitle Function to change the state defined in it */}
					<button onClick={() => this.updateTitle()}>Change Title</button>
				</BaseLayout>
			</React.Fragment>
		);
	}
}
export default Index;
