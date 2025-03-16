import { FaHeartbeat, FaHandsHelping, FaDonate } from "react-icons/fa";
import Heading from "../components/shared/Heading";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>Rokto Bondhon | About Us</title>
            </Helmet>
            <div className="w-11/12 lg:w-9/12 mx-auto">
                <Heading subtitle="About Us" title="Discover Our Mission and Story" />

                {/* Hero Section */}
                <div className="text-center">
                    <p className="mt-4 text-lg text-gray-700">
                        We are committed to bridging the gap between blood donors and those in need.
                        Join us in creating a compassionate community where every drop of blood makes a difference.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="lg:w-11/12 lg:mx-auto mt-12 flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/2">
                        <img src="https://i.ibb.co.com/3YPdrBDP/image.png" alt="Blood Donation" className="rounded-lg shadow-lg h-[300px] w-full" />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-2xl font-semibold text-red-600">Our Mission</h2>
                        <p className="mt-4 text-gray-700">
                            Rokto Bondhon is dedicated to saving lives by connecting blood donors with those who need them.
                            Our mission is to make blood donation easy, accessible, and impactful.
                        </p>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="mt-12 text-center">
                    <h2 className="text-3xl font-semibold text-red-600">Why Choose Rokto Bondhon?</h2>
                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
                            <FaHeartbeat className="text-red-600 text-4xl mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold">Life-Saving Impact</h3>
                            <p className="text-gray-600 mt-2">Every donation helps save lives and support critical medical needs.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
                            <FaHandsHelping className="text-red-600 text-4xl mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold">Community-Driven</h3>
                            <p className="text-gray-600 mt-2">We create a strong network of volunteers and donors.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
                            <FaDonate className="text-red-600 text-4xl mx-auto" />
                            <h3 className="mt-4 text-xl font-semibold">Easy & Secure</h3>
                            <p className="text-gray-600 mt-2">Seamless and secure process for both donors and recipients.</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-semibold text-red-600">Join Us in Saving Lives</h2>
                    <p className="text-gray-700 mt-4">Become a donor today and help those in need. Every drop counts.</p>
                    <button onClick={() => navigate("/register")} className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition">
                        Become a Donor
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
