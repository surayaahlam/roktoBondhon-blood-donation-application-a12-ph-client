import { Navigate } from "react-router-dom";
import Loading from "../pages/Loading";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const RoleBasedRoute = ({ children }) => {
    const { loading } = useAuth();
    const [role, isLoading] = useRole();

    if (loading || isLoading) return <Loading />;
    if (role === "Admin" || role === "Volunteer") return children;

    return <Navigate to="/" state={{ from: location }} replace='true' />;
};

export default RoleBasedRoute;