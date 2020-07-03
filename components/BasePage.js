import { Container } from 'reactstrap';

const BasePage = (props) => {
	const { className = '', children } = props;

	//Checking if props have className, if don't we assign an empty string
	// const className = props.className || '';

	return (
		<div className={`base-page ${className}`}>
			<Container>{children}</Container>
		</div>
	);
};

// //Setting DefaultProps to a className an empty string
// BasePage.defaultProps = {
// 	className: ''
// };

export default BasePage;
