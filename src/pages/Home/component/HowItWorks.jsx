import { FaUserPlus, FaHandHoldingHeart, FaTint, FaSmile } from "react-icons/fa";
import Heading from "../../../components/shared/Heading";
import { motion } from "framer-motion";

const steps = [
    { icon: <FaUserPlus />, title: "Register as a Donor", desc: "Sign up and provide your blood type and location." },
    { icon: <FaHandHoldingHeart />, title: "Find a Request", desc: "Browse urgent blood donation requests near you." },
    { icon: <FaTint />, title: "Donate Blood", desc: "Visit the hospital or donation camp to donate." },
    { icon: <FaSmile />, title: "Save Lives", desc: "Your donation can help save someone's life!" },
];

const HowItWorks = () => {
    return (
        <section className="container mx-auto mb-28">
            <Heading subtitle="How It Works" title="A Simple Way to Donate or Request Blood" />
            <div className="w-10/12 mx-auto flex flex-col lg:flex-row items-center justify-center gap-10">
                <img src="https://i.ibb.co.com/zH578M7D/6262.jpg" alt="" className="rounded-2xl h-[300px] lg:h-[400px] object-cover" />

                <div className="w-full lg:w-auto">
                    <p className="text-font_secondary mb-5">Follow these simple steps to donate blood or request donations.</p>

                    {/* Steps Section */}
                    <div className="flex flex-col gap-2">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center gap-4 p-4 border border-primary rounded-2xl shadow transition-all"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-3xl text-primary mb-4">{step.icon}</div>
                                <div>
                                    <h3 className="text-lg font-semibold">{step.title}</h3>
                                    <p className="text-font_secondary">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
