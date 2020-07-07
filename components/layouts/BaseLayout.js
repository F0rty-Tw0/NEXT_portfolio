import NavBar from '@/components/shared/NavBar';

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
					<div className="wrapper">{children}</div>
				</main>
			</div>
		</React.Fragment>
	);
};

export default BaseLayout;
