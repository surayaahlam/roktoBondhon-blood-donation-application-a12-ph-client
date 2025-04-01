import { useEffect, useState, useRef } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Heading from "../../../components/shared/Heading";

const ImpactNumbers = () => {
    const [stats] = useState({
        totalDonors: 1200,
        successfulDonations: 850,
        livesSaved: 500,
        activeVolunteers: 200,
    });

    const [inView, setInView] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setInView(true);
                    setHasAnimated(true);
                }
            },
            { threshold: 0.3 } // 30% of the section must be visible
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, [hasAnimated]);

    return (
        <section ref={sectionRef} className="container mx-auto mb-28 lg:py-16">
            <div className="w-10/12 lg:w-9/12 mx-auto">
                <Heading subtitle="Our Impact in Numbers" title="Join and Make a Difference" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center mt-10">
                    {Object.entries(stats).map(([key, value], index) => (
                        <motion.div
                            key={index}
                            className="bg-white shadow-lg rounded-lg p-6 border-l-4"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            style={{ borderColor: "#E04A46" }} // Red Highlight
                        >
                            <h3 className="text-4xl font-bold text-primary">
                                <CountUp end={hasAnimated ? value : 0} duration={4} />
                            </h3>
                            <p className="text-lg text-gray-600 mt-2 capitalize">
                                {key.replace(/([A-Z])/g, " $1")}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactNumbers;
