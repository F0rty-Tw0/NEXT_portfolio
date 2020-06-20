import React from 'react';
import NavBar from '../shared/NavBar';

const BaseLayout = (props) => {
	const { className, children } = props;
	return (
		<React.Fragment>
			<div className="layout-container">
				<NavBar />
				<main className={`cover ${className}`}>
					<div className="wrapper">{children}</div>
				</main>
			</div>
		</React.Fragment>
	);
};

export default BaseLayout;
