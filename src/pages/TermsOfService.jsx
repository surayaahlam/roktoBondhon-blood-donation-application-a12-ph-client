import { Helmet } from "react-helmet-async";
import Heading from "../components/shared/Heading";


const TermsOfService = () => {
    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>Rokto Bondhon | Terms of Service</title>
            </Helmet>
            <div className="w-11/12 lg:w-8/12 mx-auto">
                <Heading subtitle="Terms of Service" title="Understand the Rules & Guidelines" />
                <div className="bg-[#ffeeee] p-6 rounded-lg shadow-md mt-8">
                    <p className="text-font_secondary mb-4">
                        By using Rokto Bondhon, you agree to our terms and conditions outlined below.
                    </p>

                    <h3 className="text-xl font-semibold  mb-2">1. Acceptance of Terms</h3>
                    <p className="text-font_secondary mb-4">
                        By accessing our platform, you agree to comply with our terms and conditions.
                    </p>

                    <h3 className="text-xl font-semibold  mb-2">2. User Responsibilities</h3>
                    <p className="text-font_secondary mb-4">
                        Users must provide accurate information and not misuse the platform for any illegal activities.
                    </p>

                    <h3 className="text-xl font-semibold  mb-2">3. Data Protection</h3>
                    <p className="text-font_secondary mb-4">
                        We prioritize user data privacy and ensure it is used solely for donation purposes.
                    </p>

                    <h3 className="text-xl font-semibold  mb-2">4. Changes to Terms</h3>
                    <p className="text-font_secondary">
                        We reserve the right to update our terms, and users will be notified of significant changes.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
