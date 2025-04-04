import { Navigate, useLocation } from "react-router-dom";
import Loading from "../pages/Loading";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const RoleBasedRoute = ({ children }) => {
    const { loading } = useAuth();
    const [role, , isLoading] = useRole();
    const location = useLocation();

    if (loading || isLoading) return <Loading />;
    if (role === "Admin" || role === "Volunteer") return children;

    return <Navigate to="/" state={{ from: location.pathname }} replace='true' />;
};

export default RoleBasedRoute;