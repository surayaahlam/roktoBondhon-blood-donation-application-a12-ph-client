import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Heading from "../../../components/shared/Heading";

const testimonials = [
    {
        name: "Sarah Ahmed",
        image: "https://i.ibb.co.com/k2jxtg91/image.png",
        quote: "Thanks to Rokto Bondhon, I found a donor just in time! A true lifesaver!",
    },
    {
        name: "Rakib Hassan",
        image: "https://i.ibb.co.com/0RJypHVM/image.png",
        quote: "Donating blood was easy and rewarding. Happy to help someone in need!",
    },
    {
        name: "Mariam Rahman",
        image: "https://i.ibb.co.com/60zhSpC2/image.png",
        quote: "A wonderful platform connecting donors and patients efficiently!",
    },
];

const Testimonials = () => {
    return (
        <section className="container mx-auto mb-28 lg:py-10">
            <div className="w-10/12 mx-auto">
                <Heading subtitle="Testimonials" title="Real Stories from Our Donors & Recipients" />

                <Swiper
                    modules={[Pagination, Autoplay]} // Removed Navigation module
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    className="lg:w-10/12"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                className="bg-[#ffe8e8] p-6 rounded-2xl flex flex-col items-center text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                viewport={{ once: true, amount: 0.3 }}
                            >
                                <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full border-4 border-primary mb-4 object-cover" />
                                <p className="text-lg italic text-font_secondary">"{testimonial.quote}"</p>
                                <h3 className="text-xl font-semibold mt-4">{testimonial.name}</h3>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;
