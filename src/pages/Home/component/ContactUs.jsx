import Lottie from "lottie-react";
import contactLottie from "../../../assets/lottie/contact.json";
import Heading from "../../../components/shared/Heading";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    duration: 1750, // Animation duration in milliseconds
    once: true, // Whether animation should happen only once
});

const ContactUs = () => {
    return (
        <section className="container mx-auto mb-28">
            <div className="w-10/12 mx-auto">
                <div className="flex gap-10 items-center justify-between">
                    {/* Contact Image */}
                    <div className="hidden lg:block">
                        <Lottie className="w-[600px]" animationData={contactLottie}></Lottie>
                        <div data-aos="fade-right" className="text-center mt-6">
                            <p className="text-xl font-semibold">Call Us At:</p>
                            <p className="text-2xl text-primary">+880 1712 345678</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center">
                        <Heading
                            subtitle="Contact Us"
                            title="We’d Love to Hear from You"
                        ></Heading>
                        <Lottie className="w-72 md:w-96 lg:hidden" animationData={contactLottie}></Lottie>

                        <form data-aos="fade-left" action="submitForm" method="POST" className="space-y-4 md:space-y-5 w-full">
                            {/* Name Field */}
                            <div className="form-group">
                                <label htmlFor="name" className="text-lg">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    className="w-full p-3 border border-primary rounded-md"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="form-group">
                                <label htmlFor="email" className="text-lg">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    className="w-full p-3 border border-primary rounded-md"
                                />
                            </div>

                            {/* Message Field */}
                            <div className="form-group">
                                <label htmlFor="message" className="text-lg">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Write your message"
                                    className="w-full p-3 border border-primary rounded-md"
                                    rows="5"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 rounded-md font-bold hover:bg-secondary transition-all"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Contact Number */}
                <div data-aos="fade-up" className="text-center mt-12 lg:hidden">
                    <p className="text-xl font-semibold">Call Us At:</p>
                    <p className="text-2xl text-primary">+880 1712 345678</p>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;