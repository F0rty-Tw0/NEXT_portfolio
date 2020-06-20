import React from 'react';
import Link from 'next/link';
import { Link as NextLink } from '../../routes';

class Header extends React.Component {
	render() {
		//Using props(data) from Parent Component in our example its title
		const title = this.props.title;
		return (
			<React.Fragment>
				{/* Title defined in props */}
				<p>{title}</p>
				{/* Children defined in props, in our case its an <h1>*/}
				{this.props.children}
				{/* Custom Styling with SCSS from external file, element must not be included in JSX style */}
				<p className="customClassFromFile">Custom style from SCSS file</p>
				<p style={{ fontSize: '25px' }}>Custom style from Inline Style</p>
				<p className="customClassFromJSX">Custom style from JSX Style</p>
				{/* Simple Navigation with Link */}
				<Link href="/">
					<a className="navigation_Home">Home</a>
				</Link>
				<Link href="/about">
					<a className="navigation_About">About</a>
				</Link>
				<Link href="/portfolios">
					<a>Portfolio</a>
				</Link>
				<Link href="/blogs">
					<a>Blog</a>
				</Link>
				<Link href="/cv">
					<a>CV</a>
				</Link>
				<Link href="/foo">
					<a>Foo</a>
				</Link>
				{/* Simple usage of routes and links */}
				<NextLink route="test" params={{ id: '2' }}>
					<a>Test 2</a>
				</NextLink>
				<NextLink route="test" params={{ id: '5' }}>
					<a>Test 5</a>
				</NextLink>
				{/* JSX Styling for a Component itself */}
				<style jsx>
					{`
						a {
							font-size: 20px;
						}
						.navigation_Home {
							font-size: 30px;
						}
						.customClassFromJSX {
							font-size: 30px;
						}
					`}
				</style>
			</React.Fragment>
		);
	}
}
export default Header;
