import Lottie from "lottie-react";
import errorLottie from "../assets/lottie/error.json"
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    
    return (
        <div className={`container mx-auto`}>
            <Helmet>
                <title>Rokto Bondhon | Error</title>
            </Helmet>
            <div className="w-9/12 mx-auto flex flex-col items-center justify-center min-h-screen">
                <Lottie className="w-96 md:w-[490px] lg:w-[600px]" animationData={errorLottie}></Lottie>
                <div className="flex flex-col items-center gap-4 md:gap-6">
                    <p className={`text-xl md:text-[22px] lg:text-2xl font-semibold font-roboto text-center`}>Sorry, the page you are looking for doesn't exist.</p>
                    <button onClick={() => navigate("/")} className={`btn bg-primary text-white hover:bg-secondary font-roboto px-7 font-bold text-base border-none`}>Back to Home</button>
                </div>
            </div>

        </div>
    );
};

export default ErrorPage;