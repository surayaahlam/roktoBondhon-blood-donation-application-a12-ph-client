import { motion } from "framer-motion";
import Heading from "../../../components/shared/Heading";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const camps = [
    {
        id: 1,
        image: "https://i.ibb.co.com/nM67yYmY/image.png", 
        location: "Dhaka Medical College, Dhaka",
        date: "March 25, 2025",
    },
    {
        id: 2,
        image: "https://i.ibb.co.com/n8RCp0RF/image.png", 
        location: "Chittagong General Hospital, Chittagong",
        date: "April 5, 2025",
    },
    {
        id: 3,
        image: "https://i.ibb.co.com/Xx7wr6hz/image.png", 
        location: "Rajshahi Medical College, Rajshahi",
        date: "April 15, 2025",
    },
];

const UpcomingCamps = () => {
    return (
        <section className="container mx-auto mb-28">
            <div className="w-10/12 lg:w-9/12 mx-auto">
                <Heading subtitle="Upcoming Blood Donation Camps" title="Join and Make a Difference" />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {camps.map((camp, index) => (
                        <motion.div
                            key={camp.id}
                            className=" rounded-2xl shadow-lg bg-white overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <img src={camp.image} alt={camp.location} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <div className="flex items-center gap-2 text-primary">
                                    <FaMapMarkerAlt className="text-xl" />
                                    <p className="text-lg font-semibold">{camp.location}</p>
                                </div>
                                <div className="flex items-center gap-2 text-font_secondary mt-2">
                                    <FaCalendarAlt className="text-lg" />
                                    <p className="text-base">{camp.date}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpcomingCamps;
