import React, { useState } from 'react';
import Link from 'next/link';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

//Basic Link Layout, that defines a route, and a title, and returns a JSX element of a Link with a Title
const BsNavLink = (props) => {
	const { route, title } = props;
	return (
		<Link href={route}>
			<a className="nav-link">{title}</a>
		</Link>
	);
};

const Example = () => {
	//Default Reactstrap toogle function which sets true or false depending on the onClick event
	const [ isOpen, setIsOpen ] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<React.Fragment>
			{/* Simple Colapsable Bootstrap Navbar which is set to expand on medium screens */}
			<Navbar color="light" light expand="md">
				{/* Title, Logo is placed here */}
				<NavbarBrand href="/">Artiom Tofan</NavbarBrand>
				{/* Toggler for the Navbar when it shows on the medium screen */}
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					{/* All the content to the Left */}
					<Nav className="ml-auto" navbar>
						<NavItem>
							{/* Navlinks we defined in this component */}
							<BsNavLink route="/" title="Home" />
						</NavItem>
						<NavItem>
							<BsNavLink route="/about" title="About" />
						</NavItem>
						<NavItem>
							<BsNavLink route="/portfolios" title="Portfolio" />
						</NavItem>
						<NavItem>
							<BsNavLink route="/blogs" title="Blog" />
						</NavItem>
						<NavItem>
							<BsNavLink route="/cv" title="CV" />
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</React.Fragment>
	);
};

export default Example;
