import React, { useState } from 'react';
import Link from 'next/link';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
//React Particles (https://github.com/Wufe/react-particles-js) are not that costumizable, have to think switching to https://github.com/matteobruni/tsparticles
import Particles from 'react-particles-js';

//Basic Link Layout, that defines a route, and a title, and returns a JSX element of a Link with a Title
const BsNavLink = (props) => {
	const { route, title } = props;
	return (
		<Link href={route}>
			<a className="nav-link port-navbar-link">{title}</a>
		</Link>
	);
};

//Login Button layout
const Login = () => <BsNavLink route="/api/v1/login" title="Login" />;

//Logout Button layout
const Logout = () => <BsNavLink route="/api/v1/logout" title="Logout" />;

// Base NavBar - which will be a shared component -  which has user data and loading state
const NavBar = ({ user, loadingUser }) => {
	//Default Reactstrap toogle function which sets true or false depending on the onClick event
	const [ isOpen, setIsOpen ] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		//React.Fragment is used instead of <div> or <> to hide it from source
		<React.Fragment>
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
			{/* Simple Colapsable Bootstrap Navbar which is set to expand on medium screens */}
			<Navbar className="port-navbar port-default absolute" color="transparent" dark expand="lg">
				{/* Title, Logo is placed here */}
				<Link href="/">
					<a className="navbar-brand port-navbar-brand">Artiom Tofan</a>
				</Link>
				{/* Toggler for the Navbar when it shows on the medium screen */}
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar className="float-right text-right">
					{/* All the content to the Left */}
					<Nav className="mr-auto" navbar>
						<NavItem className="port-navbar-item">
							{/* Navlinks we defined in this component */}
							<BsNavLink route="/" title="Home" />
						</NavItem>
						<NavItem className="port-navbar-item">
							<BsNavLink route="/about" title="About" />
						</NavItem>
						<NavItem className="port-navbar-item">
							<BsNavLink route="/portfolios" title="Portfolio" />
						</NavItem>
						<NavItem className="port-navbar-item">
							<BsNavLink route="/blogs" title="Blog" />
						</NavItem>
						<NavItem className="port-navbar-item">
							<BsNavLink route="/cv" title="CV" />
						</NavItem>
						<NavItem className="port-navbar-item">
							<BsNavLink route="/secret" title="Secret" />
						</NavItem>
						<NavItem className="port-navbar-item">
							<BsNavLink route="/secretssr" title="Secret SSR" />
						</NavItem>
						<NavItem className="port-navbar-item">
							<BsNavLink route="/admin" title="Admin" />
						</NavItem>
						<NavItem className="port-navbar-item">
							<BsNavLink route="/adminssr" title="Admin SSR" />
						</NavItem>
					</Nav>
					{/* NavBar for login, logout, and user name with */}
					<Nav className="ml-auto" navbar>
						{/* Checking if we have an user we show logout, if not the login button is shown */}
						{!loadingUser && (
							//React.Fragment is used instead of <div> or <> to hide it from source
							<React.Fragment>
								{user && (
									<NavItem className="port-navbar-item">
										<Logout />
									</NavItem>
								)}
								{!user && (
									<NavItem className="port-navbar-item">
										<Login />
									</NavItem>
								)}
							</React.Fragment>
						)}

						{/* {isAuthenticated && ( */}
						<NavItem className="port-navbar-item">
							{/* <span className="nav-link port-navbar-link">{user.given_name}</span> */}
						</NavItem>
						{/* )} */}
					</Nav>
				</Collapse>
			</Navbar>
		</React.Fragment>
	);
};

export default NavBar;
