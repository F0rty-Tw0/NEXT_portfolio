import React from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';

class SupperComponent extends React.Component {
    //Passing props to every constructor
	constructor(props) {
		super(props);
		this.someVariable = 'Just Some Variable';
	}
	alertName(title) {
		alert(title);
	}
	render() {
		return (
			<BaseLayout>
				<h1 className="title"> This is Supper Component page(Class Component)</h1>
			</BaseLayout>
		);
	}
}
export default SupperComponent;
