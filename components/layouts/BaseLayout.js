import NavBar from '@/components/shared/NavBar';
//React Particles (https://github.com/Wufe/react-particles-js) are not that costumizable, have to think switching to https://github.com/matteobruni/tsparticles
import Particles from 'react-particles-js';

const BaseLayout = (props) => {
	//Retrieving user, loading, className, and children from porps
	const { className, children, user, loading } = props;

	return (
		//React.Fragment is used instead of <div> or <> to hide it from source
		<React.Fragment>
			<div className="layout-container">
				{/* Base NavBar - Shared component which has user data and loading state */}
				<NavBar user={user} loading={loading} />
				<main className={`cover ${className}`}>
					{/* Particles effect on the background */}
					<Particles
						id="particles"
						params={{
							particles: {
								number: {
									value: 70,
									density: {
										enable: true,
										value_area: 800
									}
								},
								color: {
									value: '#ffffff'
								},
								shape: {
									type: 'circle',
									stroke: {
										width: 0,
										color: '#000000'
									},
									polygon: {
										nb_sides: 5
									}
								},
								opacity: {
									value: 0.2,
									random: false,
									anim: {
										enable: false,
										speed: 1,
										opacity_min: 0.1,
										sync: false
									}
								},
								size: {
									value: 3,
									random: true,
									anim: {
										enable: false,
										speed: 40,
										size_min: 0.1,
										sync: false
									}
								},
								line_linked: {
									enable: true,
									distance: 150,
									color: '#ffffff',
									opacity: 0.3,
									width: 1
								},
								move: {
									enable: true,
									speed: 3,
									direction: 'none',
									random: false,
									straight: false,
									out_mode: 'out',
									bounce: false,
									attract: {
										enable: false,
										rotateX: 600,
										rotateY: 1200
									}
								}
							},
							interactivity: {
								detect_on: 'window',
								events: {
									onhover: {
										enable: true,
										mode: [ 'grab', 'bubble' ]
									},
									onclick: {
										enable: false,
										mode: 'push'
									},
									resize: true
								},
								modes: {
									grab: {
										distance: 150,
										line_linked: {
											opacity: 0.3
										}
									},
									bubble: {
										distance: 100,
										size: 40,
										duration: 2,
										opacity: 0.1,
										speed: 3
									},
									repulse: {
										distance: 200,
										duration: 0.4
									},
									push: {
										particles_nb: 4
									},
									remove: {
										particles_nb: 2
									}
								}
							},
							retina_detect: true
						}}
					/>
					<div className="wrapper">{children}</div>
				</main>
			</div>
		</React.Fragment>
	);
};

export default BaseLayout;
