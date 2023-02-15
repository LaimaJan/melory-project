import { Navigate, Outlet, useHref } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

function PrivateRoute() {
	const { token } = useContext(AuthContext);
	const href = useHref();

	if (!token) {
		return <Navigate to="/" replace state={href} />;
	}

	return <Outlet />;
}

export default PrivateRoute;
