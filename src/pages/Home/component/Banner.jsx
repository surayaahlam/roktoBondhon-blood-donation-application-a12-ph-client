import { useNavigate } from "react-router-dom";
import bannerImg from "../../../assets/banner.jpg";

const Banner = () => {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto mb-28">
            <div
                className="hero h-[700px] bg-fixed"
                style={{
                    backgroundImage: `url("${bannerImg}")`,
                }}>
                <div className="hero-content text-neutral-content text-center">
                    <div className="w-11/12 lg:w-full">
                        <h1 className="mb-5 text-5xl lg:text-6xl font-bold">Your Ultimate Platform for Blood Donation Awareness and Action</h1>
                        <p className="mb-5 font-nunito">
                            Our platform is designed to make blood donation simple and efficient by connecting donors with those in need. It promotes a seamless process <br /> while building a supportive community dedicated to saving lives and making a meaningful impact.
                        </p>
                        <div className="flex justify-center gap-5">
                            <button onClick={() => navigate("/register")} className={`btn bg-button text-white hover:bg-secondary font-roboto px-7 font-bold text-base border-none uppercase`}>Join as a donor</button>
                            <button onClick={() => navigate("/search")} className={`btn bg-white text-button hover:bg-secondary hover:text-white font-roboto px-7 font-bold text-base border-none uppercase`}>Search Donors</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;