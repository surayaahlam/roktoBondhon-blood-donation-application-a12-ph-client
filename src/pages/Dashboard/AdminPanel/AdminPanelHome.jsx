import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import StatCard from "../../../components/Dashboard/StatCard";
import { GiReceiveMoney } from "react-icons/gi";
import { MdBloodtype } from "react-icons/md";
import { RiUserFill } from "react-icons/ri";

const AdminPanelHome = () => {
    const { user } = useAuth();

    return (
        <div className="mb-8 md:mb-6">
            <Helmet>
                <title>Rokto Bondhon | Dashboard</title>
            </Helmet>
            <div className="mt-2 mb-8 lg:mb-12 flex flex-col justify-center lg:items-center px-2 md:px-4 lg:px-0">
                <h2 className="text-3xl lg:text-5xl font-extrabold text-primary mb-2">Welcome {user?.displayName} !</h2>
                <p className="text-base lg:text-lg font-nunito">Review and manage donation requests with ease.</p>
            </div>

            <div className="px-2 md:px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8">
                    <StatCard icon={RiUserFill} title="Total User (Donors)" count="5" percentage="+4.2" />
                    <StatCard icon={GiReceiveMoney} title="Total Funding" count="14,732৳" percentage="+4.2" />
                    <StatCard icon={MdBloodtype} title="Total Blood Donation Request" count="11" percentage="+4.2" />
                </div>

            </div>
        </div>
    );
};

export default AdminPanelHome;