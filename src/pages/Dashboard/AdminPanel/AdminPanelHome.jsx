import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";

const AdminPanelHome = () => {
    const { user } = useAuth();
    
    return (
        <div className="mb-8 md:mb-6">
            <Helmet>
                <title>Rokto Bondhon | Dashboard</title>
            </Helmet>
            <div className="mb-4">
                <h2 className="text-3xl lg:text-5xl font-extrabold text-primary mb-2">Welcome {user?.displayName} !</h2>
                <p className="text-base lg:text-lg font-nunito">Review and manage donation requests with ease.</p>
            </div>

            <div className="px-2 md:px-4 lg:px-8">

            </div>
        </div>
    );
};

export default AdminPanelHome;