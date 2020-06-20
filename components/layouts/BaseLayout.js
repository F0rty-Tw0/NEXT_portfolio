import React from 'react';
import Header from '../shared/Header';

const BaseLayout = (props) => {
	const { className, children } = props;
	return (
		<React.Fragment>
			<div className="layout-container">
				<Header />
				<main className={`cover ${className}`}>
					<div className="wrapper">{children}</div>
				</main>
			</div>
		</React.Fragment>
	);
};

export default BaseLayout;
