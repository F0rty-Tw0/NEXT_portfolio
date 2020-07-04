import React, { useState } from 'react';
import Link from 'next/link';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';

import auth0 from '@/services/auth0';

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
const Login = () => {
	return (
		<span onClick={auth0.login} className="nav-link port-navbar-link clickable">
			Login
		</span>
	);
};

//Logout Button layout
const Logout = () => {
	return (
		<span onClick={auth0.logout} className="nav-link port-navbar-link clickable">
			Logout
		</span>
	);
};

const NavBar = (props) => {
	//Default Reactstrap toogle function which sets true or false depending on the onClick event
	const [ isOpen, setIsOpen ] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	const { isAuthenticated, user } = props;
	return (
		<React.Fragment>
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
					</Nav>
					<Nav className="ml-auto" navbar>
						{/* Checking if the user is uthenticated, if not the login button is shown */}
						{!isAuthenticated && (
							<NavItem className="port-navbar-item">
								<Login />
							</NavItem>
						)}
						{/* Checking if the user is uthenticated, if yes the Logout button is shown */}
						{isAuthenticated && (
							<NavItem className="port-navbar-item">
								<Logout />
							</NavItem>
						)}

						{isAuthenticated && (
							<NavItem className="port-navbar-item">
								<span className="nav-link port-navbar-link">{user.given_name}</span>
							</NavItem>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</React.Fragment>
	);
};

export default NavBar;
