import { Helmet } from "react-helmet-async";
import Heading from "../components/shared/Heading";


const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>Rokto Bondhon | Privacy Policy</title>
            </Helmet>
            <div className="w-11/12 lg:w-8/12 mx-auto">
                <Heading subtitle="Privacy Policy" title="Your Privacy Matters to Us" />
                <div className="bg-[#ffeeee] p-6 rounded-lg shadow-md mt-8">
                    <p className="text-font_secondary mb-4">
                        Welcome to Rokto Bondhon. We are committed to protecting your personal information and your right to privacy.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">1. Information We Collect</h3>
                    <p className="text-font_secondary mb-4">
                        We collect personal information such as your name, email address, phone number, and donation history.
                    </p>

                    <h3 className="text-xl font-semibold  mb-2">2. How We Use Your Information</h3>
                    <p className="text-font_secondary mb-4">
                        Your information is used to connect donors with recipients, improve our services, and communicate important updates.
                    </p>

                    <h3 className="text-xl font-semibold  mb-2">3. Data Security</h3>
                    <p className="text-font_secondary mb-4">
                        We implement security measures to protect your personal data from unauthorized access.
                    </p>

                    <h3 className="text-xl font-semibold  mb-2">4. Your Rights</h3>
                    <p className="text-font_secondary">
                        You have the right to request access, correction, or deletion of your personal data at any time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
