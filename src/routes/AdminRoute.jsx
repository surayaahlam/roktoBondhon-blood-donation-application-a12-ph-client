import { Navigate } from 'react-router-dom'
import useRole from '../hooks/useRole';
import Loading from '../pages/Loading';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const [role, , isLoading] = useRole();

    if (isLoading) return <Loading />;
    if (role === 'Admin') return children;
    return <Navigate to="/" state={{ from: location.pathname }} replace='true' />;
}

export default AdminRoute;