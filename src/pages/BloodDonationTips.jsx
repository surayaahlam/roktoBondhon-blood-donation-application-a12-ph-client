import { Helmet } from "react-helmet-async";
import Heading from "../components/shared/Heading";


const tips = [
    {
        title: "Stay Hydrated",
        description:
            "Drink plenty of water before and after your donation to help maintain blood volume levels.",
    },
    {
        title: "Eat a Healthy Meal",
        description:
            "Have a nutritious meal rich in iron and vitamin C before donating to prevent dizziness.",
    },
    {
        title: "Avoid Alcohol & Caffeine",
        description:
            "Do not consume alcohol or caffeine 24 hours before donating as they can lead to dehydration.",
    },
    {
        title: "Get Enough Rest",
        description:
            "Make sure you have at least 6-8 hours of sleep the night before donating blood.",
    },
    {
        title: "Wear Comfortable Clothing",
        description:
            "Wear a shirt with loose sleeves or short sleeves for easy access to your arm during donation.",
    },
    {
        title: "Relax & Stay Calm",
        description:
            "If you're feeling anxious, take deep breaths and relax. The process is quick and safe.",
    },
    {
        title: "Avoid Heavy Exercise",
        description:
            "Refrain from strenuous exercise for at least 24 hours after donating to prevent fatigue.",
    },
    {
        title: "Monitor Your Health",
        description:
            "If you feel dizzy or unwell after donating, lie down, drink fluids, and seek help if needed.",
    },
];

const BloodDonationTips = () => {
    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>Rokto Bondhon | Blood Donation Tips</title>
            </Helmet>
            <div className="w-11/12 lg:w-9/12 mx-auto">
                <Heading subtitle="Blood Donation Tips" title="Prepare Yourself for a Safe Donation" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {tips.map((tip, index) => (
                        <div key={index} className="bg-[#ffeeee] p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">
                                {tip.title}
                            </h3>
                            <p className="text-font_secondary">{tip.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BloodDonationTips;
