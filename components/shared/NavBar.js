import React, { useState } from 'react';
import Link from 'next/link';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';

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
const NavBar = ({ user, loading }) => {
	//Default Reactstrap toogle function which sets true or false depending on the onClick event
	const [ isOpen, setIsOpen ] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		//React.Fragment is used instead of <div> or <> to hide it from source
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
					{/* NavBar for login, logout, and user name with */}
					<Nav className="ml-auto" navbar>
						{/* Checking if we have an user we show logout, if not the login button is shown */}
						{!loading && (
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
