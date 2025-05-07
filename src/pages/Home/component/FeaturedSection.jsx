import { FaUserCheck, FaClock, FaShieldAlt, FaSearchLocation, FaPenAlt, FaBook } from "react-icons/fa";
import Heading from "../../../components/shared/Heading";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    duration: 1750, // Animation duration in milliseconds
    once: true, // Whether animation should happen only once
});

const FeaturedSection = () => {
    return (
        <div className="bg-gray-100 py-[92px] mb-28">
            <div className="container mx-auto px-6">
                <div className="w-11/12 lg:w-10/12 mx-auto">
                    <Heading
                        subtitle="Featured"
                        title="Why Choose Us for Blood Donation?"
                    ></Heading>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-nunito">
                        {/* Trusted Network */}
                        <div data-aos="fade-down" className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FaUserCheck className="text-primary text-4xl mx-auto mb-4" />
                            <h3 className="text-xl md:text-[22px] font-bold mb-2">Trusted Network</h3>
                            <p className="text-font_secondary">Join a verified and reliable donor community.</p>
                        </div>

                        {/* Real-Time Matching */}
                        <div data-aos="fade-down" className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FaSearchLocation className="text-primary text-4xl mx-auto mb-4" />
                            <h3 className="text-xl md:text-[22px] font-bold mb-2">Real-Time Matching</h3>
                            <p className="text-font_secondary">Quickly locate donors near you with ease.</p>
                        </div>

                        {/* Secure & Reliable */}
                        <div data-aos="fade-down" className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FaShieldAlt className="text-primary text-4xl mx-auto mb-4" />
                            <h3 className="text-xl md:text-[22px] font-bold mb-2">Secure & Reliable</h3>
                            <p className="text-font_secondary">We prioritize your privacy and safety.</p>
                        </div>

                        {/* Easy Registration */}
                        <div data-aos="fade-up" className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FaPenAlt className="text-primary text-4xl mx-auto mb-4" />
                            <h3 className="text-xl md:text-[22px] font-bold mb-2">Easy Registration</h3>
                            <p className="text-font_secondary">Sign up quickly as a donor or recipient.</p>
                        </div>

                        {/* 24/7 Accessibility */}
                        <div data-aos="fade-up" className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FaClock className="text-primary text-4xl mx-auto mb-4" />
                            <h3 className="text-xl md:text-[22px] font-bold mb-2">24/7 Accessibility</h3>
                            <p className="text-font_secondary">Always available for urgent blood needs.</p>
                        </div>

                        {/* Educational Resources */}
                        <div data-aos="fade-up" className="bg-white p-6 rounded-lg shadow-md text-center">
                            <FaBook className="text-primary text-4xl mx-auto mb-4" />
                            <h3 className="text-xl md:text-[22px] font-bold mb-2">Educational Resources</h3>
                            <p className="text-font_secondary">Learn about blood donation and eligibility.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedSection;