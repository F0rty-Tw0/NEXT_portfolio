import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
//Typed for auto typing text (https://github.com/mattboldt/typed.js)
import Typed from 'react-typed';
//Bootstrap Element - Container, Row, Col from Reactstrap
import { Container, Row, Col } from 'reactstrap';
//React Particles (https://github.com/Wufe/react-particles-js) are not that costumizable, have to think switching to https://github.com/matteobruni/tsparticles
import Particles from 'react-particles-js';

//Calls everything what is included in SuperComponent
class Index extends React.Component {
	constructor(props) {
		super(props);

		this.roles = [
			'My strings are: <i>strings</i> with',
			'My strings are: <strong>HTML</strong>',
			'Chars &times; &copy;',
			'My strings are: <i>strings</i> with',
			'My strings are: <strong>HTML</strong>',
			'Chars &times; &copy;'
		];
	}

	//Lifecycle function Render
	render() {
		return (
			//React.Fragment is used instead of <div /> to hide it from source
			<React.Fragment>
				<BaseLayout {...this.props.auth} className="cover">
					<div className="main-section">
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
						<Container>
							<Row>
								<Col md="6">
									<div className="display-section">
										<div className={`flipper`}>
											<div className="back">
												<div className="display-section-content">
													<h2> Full Stack Web Developer </h2>
													<div className="display-section-content-intro">
														Have a look at my portfolio and job history.
													</div>
												</div>
												<img className="image shadowed" src="/static/images/display-1.png" />
												{/* Shadow for PNG image */}
												<svg height="0" width="0">
													<filter id="drop-shadow">
														<feGaussianBlur in="SourceAlpha" stdDeviation="2.2" />
														<feOffset dx="-15" dy="1" result="offsetblur" />
														<feFlood floodColor="rgba(38, 113, 129, 0.7)" />
														<feComposite in2="offsetblur" operator="in" />
														<feMerge>
															<feMergeNode />
															<feMergeNode in="SourceGraphic" />
														</feMerge>
													</filter>
												</svg>
											</div>
										</div>
									</div>
								</Col>
								<Col md="6" className="display-welcome-wrapper">
									<div className="display-welcome-text">
										<h1>
											Fusce convallis accumsan erat sit amet ornare. Mauris in leo sed massa
											dignissim ullamcorper. Pellentesque a maximus justo, sed maximus augue.
											Curabitur eleifend massa sed imperdiet bibendum. Vivamus maximus dolor dui,
											ac vestibulum nisi faucibus vitae. Etiam fermentum posuere mauris eu pretium
										</h1>
										<Typed
											loop
											typeSpeed={70}
											backSpeed={50}
											strings={this.roles}
											smartBackspace
											backDelay={1000}
											showCursor
											cursorChar="|"
											className="self-typed"
										/>
									</div>
									<div className="display-welcome-bio">
										<h1>Let's take a look on my work.</h1>
									</div>
								</Col>
							</Row>
						</Container>
					</div>
				</BaseLayout>
			</React.Fragment>
		);
	}
}
export default Index;
