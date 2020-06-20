import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
//Typed for auto typing text
import Typed from 'react-typed';
//Bootstrap Element - Container, Row, Col from Reactstrap
import { Container, Row, Col } from 'reactstrap';

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
				<BaseLayout className="cover">
					<div className="main-section">
						<div className="background-image">
							<img src="/static/images/background.png" />
						</div>

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
												<img className="image" src="/static/images/display-1.png" />
												<div className="shadow-custom">
													<div className="shadow-inner"> </div>
												</div>
											</div>
										</div>
									</div>
								</Col>
								<Col md="6" className="display-welcome-wrapper">
									<div className="display-welcome-text">
										<h1>
											Welcome to the portfolio website of Filip Jerga. Get informed, collaborate
											and discover projects I was working on through the years!
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
