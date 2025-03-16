import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Heading from "../components/shared/Heading";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import faqLottie from "../assets/lottie/faq.json";

const faqs = [
    {
        question: "Who can donate blood?",
        answer: "Anyone who is healthy, aged between 18-65, and meets the weight and hemoglobin level requirements can donate blood.",
    },
    {
        question: "How often can I donate blood?",
        answer: "You can donate whole blood every 3 months for men and every 4 months for women. Plasma donations can be done more frequently.",
    },
    {
        question: "Is blood donation safe?",
        answer: "Yes, blood donation is completely safe. We use sterile, one-time-use equipment for each donation to ensure safety.",
    },
    {
        question: "How long does the donation process take?",
        answer: "The whole process, including registration, donation, and rest, usually takes around 30-45 minutes.",
    },
    {
        question: "Can I donate blood if I have a tattoo?",
        answer: "Yes, but you should wait at least 6 months after getting a tattoo to donate blood.",
    },
];

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>Rokto Bondhon | FAQs</title>
            </Helmet>
            <Heading subtitle="FAQs" title="Find Answers to Your Questions" />
            <div className="w-11/12 lg:w-8/12 mx-auto flex flex-col md:flex-row items-center justify-center">
                <div className="lg:w-[30%]">
                    <Lottie className="w-[300px]" animationData={faqLottie}></Lottie>
                </div>
                <div className="space-y-4 lg:w-[70%]">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-[#ffeeee] p-4 rounded-lg shadow-md cursor-pointer"
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">
                                    {faq.question}
                                </h3>
                                {openIndex === index ? (
                                    <FaChevronUp className="text-primary" />
                                ) : (
                                    <FaChevronDown className="text-primary" />
                                )}
                            </div>
                            {openIndex === index && (
                                <p className="mt-2 text-font_secondary">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
};

export default FAQPage;
