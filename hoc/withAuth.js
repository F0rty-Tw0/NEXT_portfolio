//High Order Component - HOC
//Simple function that takes a component and returns new component with some extended functionality
//Simplified way to write, not realy friendly readable
// const withAuth = (Component) => (props) => <Component {...props} />;

//More usual way to write it
const withAuth = (Component) => {
	return (props) => {
		return <Component {...props} />;
	};
};
export default withAuth;
