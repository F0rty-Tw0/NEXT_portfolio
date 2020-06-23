import React from 'react';
import NavBar from '../shared/NavBar';

const BaseLayout = (props) => {
	const { className, children, isAuthenticated, user } = props;
	return (
		<React.Fragment>
			<div className="layout-container">
				<NavBar isAuthenticated={isAuthenticated} user={user} />
				<main className={`cover ${className}`}>
					<div className="wrapper">{children}</div>
				</main>
			</div>
		</React.Fragment>
	);
};

export default BaseLayout;
