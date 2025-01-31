import { Helmet } from "react-helmet-async";
import Heading from "../components/shared/Heading";
import { useNavigate } from "react-router-dom";

const Funding = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>Rokto Bondhon | Funding Page</title>
            </Helmet>
            <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
                <Heading title="Funding" />
                <div className="text-right">
                    <button onClick={() => navigate("/give-fund")} className="btn bg-primary border-none text-white hover:bg-secondary text-sm uppercase px-7">Give Fund</button>
                </div>
            </div>
        </div>
    );
};

export default Funding;