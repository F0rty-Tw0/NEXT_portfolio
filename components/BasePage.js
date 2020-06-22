import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

const BasePage = (props) => {
	const { className } = props;

	//Checking if props have className, if don't we assign an empty string
	// const className = props.className || '';

	return (
		<div className={`base-page ${className}`}>
			<Container>{props.children}</Container>
		</div>
	);
};

//Setting DefaultProps to a className an empty string
BasePage.defaultProps = {
	className: ''
};

export default BasePage;
