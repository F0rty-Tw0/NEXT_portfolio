import React from 'react';

//Creating a function with Component (our page) as argument
export default function(Component) {
	//Returning withAtuh Component
	return class withAtuhExample extends React.Component {
		//The power of High Order Components :D we can provide functions to our component as a prop
		alertMessage() {
			alert('some random text');
		}
		render() {
			//The power of High Order Components :D we can provide variables to our component as a prop
			const randomVariable1 = '1';
			const randomVariable2 = '2';
			//Forwarding this.props and destructirizing them so our page can use it
			return (
				<Component
					randomVariable2={randomVariable2}
					randomVariable1={randomVariable1}
					alertMessage={this.alertMessage}
					{...this.props}
				/>
			);
		}
	};
}
