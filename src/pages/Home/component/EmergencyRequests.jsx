import { motion } from "framer-motion";
import Heading from "../../../components/shared/Heading";
import { FaMapMarkerAlt, FaTint } from "react-icons/fa";

const requests = [
    {
        id: 1,
        bloodType: "A+",
        location: "Dhaka Medical College, Dhaka",
        urgency: "Urgent",
        time: "10 mins ago",
    },
    {
        id: 2,
        bloodType: "O-",
        location: "Chittagong General Hospital, Chittagong",
        urgency: "Critical",
        time: "20 mins ago",
    },
    {
        id: 3,
        bloodType: "B+",
        location: "Rajshahi Medical College, Rajshahi",
        urgency: "High Priority",
        time: "30 mins ago",
    },
];

const EmergencyRequests = () => {
    return (
        <section className="container mx-auto mb-28">
            <div className="w-10/12 mx-auto">
                <Heading subtitle="Emergency Blood Requests" title="Urgent Cases Needing Immediate Attention" />

                <div className="flex items-center justify-center flex-col-reverse md:flex-row gap-7 lg:gap-20">
                    <div className="flex flex-col gap-2">
                        {requests.map((request, index) => (
                            <motion.div
                                key={request.id}
                                className="border border-primary rounded-2xl bg-white p-4 flex flex-col gap-1 w-full"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-xl font-bold">{request.bloodType}</p>
                                    <p className="text-sm text-gray-500">{request.time}</p>
                                </div>

                                <div className="flex items-center gap-2 text-primary">
                                    <FaMapMarkerAlt className="text-lg" />
                                    <p className="text-base font-semibold">{request.location}</p>
                                </div>

                                <div className="flex items-center gap-2 font-semibold">
                                    <FaTint className="text-base text-primary" />
                                    <p className="text-sm text-font_secondary">{request.urgency}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <img src="https://i.ibb.co.com/5brzkv4/freepik-retouch-99098.png" alt="" className="h-[300px] lg:h-[400px] object-cover rounded-2xl"/>
                </div>
            </div>
        </section>
    );
};

export default EmergencyRequests;
