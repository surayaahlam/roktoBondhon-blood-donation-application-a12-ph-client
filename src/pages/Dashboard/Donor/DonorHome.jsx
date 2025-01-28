import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";

const DonorHome = () => {
    const { user } = useAuth();

    return (
        <div className="mb-8 md:mb-6">
            <Helmet>
                <title>Rokto Bondhon | Dashboard</title>
            </Helmet>
            <div className="mt-2 mb-4 flex flex-col justify-center items-center">
                <h2 className="text-3xl lg:text-5xl font-extrabold text-primary mb-2 text-center">Welcome {user?.displayName} !</h2>
                <p className="text-base lg:text-lg font-semibold font-nunito text-center">Manage your donation requests and make a difference.</p>
            </div>


            <div className="px-2 md:px-4 lg:px-8">

            </div>
        </div>
    );
};

export default DonorHome;