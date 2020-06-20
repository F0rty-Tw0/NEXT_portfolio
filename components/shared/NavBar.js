import React, { useState } from 'react';
import Link from 'next/link';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

//Basic Link Layout, that defines a route, and a title, and returns a JSX element of a Link with a Title
const BsNavLink = (props) => {
	const { route, title } = props;
	return (
		<Link href={route}>
			<a className="nav-link port-navbar-link">{title}</a>
		</Link>
	);
};

const NavBar = () => {
	//Default Reactstrap toogle function which sets true or false depending on the onClick event
	const [ isOpen, setIsOpen ] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<React.Fragment>
			{/* Simple Colapsable Bootstrap Navbar which is set to expand on medium screens */}
			<Navbar className="port-navbar port-default absolute" color="transparent" light expand="md">
				{/* Title, Logo is placed here */}
				<NavbarBrand className="port-navbar-brand" href="/">
					Artiom Tofan
				</NavbarBrand>
				{/* Toggler for the Navbar when it shows on the medium screen */}
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					{/* All the content to the Left */}
					<Nav className="ml-auto" navbar>
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
				</Collapse>
			</Navbar>
		</React.Fragment>
	);
};

export default NavBar;
