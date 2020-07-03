import React from 'react';
import NavBar from '../shared/NavBar';
//React Particles (https://github.com/Wufe/react-particles-js) are not that costumizable, have to think switching to https://github.com/matteobruni/tsparticles
import Particles from 'react-particles-js';
const BaseLayout = (props) => {
	const { className, children, isAuthenticated, user } = props;
	return (
		<React.Fragment>
			<div className="layout-container">
				<NavBar isAuthenticated={isAuthenticated} user={user} />
				<main className={`cover ${className}`}>
					{/* Particles effect on the background */}
					<Particles
							id="particles"
							params={{
								particles: {
									number: {
										value: 100
									},
									size: {
										value: 3
									}
								},
								interactivity: {
									events: {
										onhover: {
											enable: true,
											mode: 'bubble'
										}
									},
									modes: {
										bubble: {
											opacity: 0.1,
											distance: 100,
											duration: 2
										}
									}
								}
							}}
						/>
						{children}
					<div className="wrapper">					
					</div>
				</main>
			</div>
		</React.Fragment>
	);
};

export default BaseLayout;
