import useRole from "../../hooks/useRole";
import Loading from "../Loading";
import AdminPanelHome from "./AdminPanel/AdminPanelHome";
import DonorHome from "./Donor/DonorHome";

const RoleBasedDashboard = () => {
    const [role, isLoading] = useRole();

    if (isLoading) {
        return <Loading></Loading>;
    }

    if (role === "Admin" || role === "Volunteer") {
        return <AdminPanelHome></AdminPanelHome>;
    } 
    
    return <DonorHome></DonorHome>;
};

export default RoleBasedDashboard;