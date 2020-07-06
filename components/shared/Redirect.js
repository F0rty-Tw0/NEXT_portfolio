import { useEffect } from 'react';
import { useRouter } from 'next/router';

//Destructurizing params, and getting prop {to}
const Redirect = ({ to }) => {
	const router = useRouter();
	//UseEffect is executed always in browser when the component is loaded
	useEffect(() => {
		//Redirecting to (value we define in "to")
		router.push(to);
		//Dependancy array [] to make it executable only once
	}, []);
	return null;
};

export default Redirect;
