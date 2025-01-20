import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import logoImg from "../assets/logo1.png"
import { BiSolidRightArrow } from "react-icons/bi";

const Footer = () => {
    return (

        <footer className="bg-footer pt-16 pb-6 md:pb-8">
            <div className="container mx-auto">
                <div className="w-11/12 lg:w-10/12 mx-auto">

                    {/* Logo Section */}
                    <div className="flex flex-col md:flex-row gap-6 md:gap-28 lg:gap-56">
                        <div className="flex items-center hover:bg-transparent gap-3 md:gap-4">
                            <img className="w-[50px] h-[50px] md:w-14 md:h-14" src={logoImg} alt="logo" />
                            <h2 className={`text-[24px] md:text-[30px] leading-none font-nunito font-extrabold text-left uppercase text-white`}><span className="text-primary">Rokto</span><br />Bondhon</h2>
                        </div>
                        <p className="text-base font-normal text-font_tertiary font-nunito">Rokto Bondhon is dedicated to saving lives by bridging the gap between blood donors and those in need. Join us in creating a community of compassion, where every drop of blood makes a difference. Together, we can ensure that no life is lost due to the lack of blood.</p>
                    </div>

                    <div className="w-full h-[0.2px] bg-gray-500 my-9 md:my-12"></div>

                    <div className="md:grid md:grid-cols-2 lg:flex justify-between items-start">
                        <nav className="flex flex-col text-font_quaternary font-nunito mb-6 md:mb-0">
                            <h2 className="text-font_tertiary font-roboto uppercase text-lg font-bold">Contact Info</h2>
                            <div className="w-16 h-[1.5px] bg-primary my-4"></div>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <FaLocationDot className="text-primary" />
                                    <p className="text-base font-normal lg:text-start">House #12, Road #5, Dhanmondi, <br />Dhaka-1205, Bangladesh</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaPhone className="text-primary" />
                                    <h3 className="text-base font-normal">+880 1712 345678</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <IoIosMail size={20} className="text-primary" />
                                    <p className="text-base font-normal">support@roktobondhon.com</p>
                                </div>
                            </div>
                        </nav>

                        {/* Quick Links */}
                        <div className="mb-6 md:mb-0">
                            <h2 className="text-font_tertiary font-roboto uppercase text-lg font-bold">Quick Links</h2>
                            <div className="w-16 h-[1.5px] bg-primary my-4"></div>
                            <ul className="mt-2 space-y-2 text-font_quaternary">
                                <li className="flex items-center gap-2"><BiSolidRightArrow size={10} className="text-primary" /><a href="#" className="link link-hover text-base font-normal">About Us</a></li>
                                <li className="flex items-center gap-2"><BiSolidRightArrow size={10} className="text-primary" /><a href="#" className="link link-hover text-base font-normal">FAQs</a></li>
                                <li className="flex items-center gap-2"><BiSolidRightArrow size={10} className="text-primary" /><a href="#" className="link link-hover text-base font-normal">Blood Donation Tips</a></li>
                                <li className="flex items-center gap-2"><BiSolidRightArrow size={10} className="text-primary" /><a href="#" className="link link-hover text-base font-normal">Privacy Policy</a></li>
                                <li className="flex items-center gap-2"><BiSolidRightArrow size={10} className="text-primary" /><a href="#" className="link link-hover text-base font-normal">Terms of Service</a></li>
                            </ul>
                        </div>

                        {/* Social Media and Newsletter */}
                        <div>
                            <h2 className="text-font_tertiary font-roboto uppercase text-lg font-bold">Stay Connected</h2>
                            <div className="w-16 h-[1.5px] bg-primary my-4"></div>
                            <div className="mt-2 flex space-x-3">
                                <a className="link link-hover hover:hover:scale-90 p-2 bg-primary rounded text-white" href=""><FaLinkedinIn size={18} /></a>
                                <a className="link link-hover hover:hover:scale-90 p-2 bg-primary rounded text-white" href=""><FaInstagram size={18} /></a>
                                <a className="link link-hover hover:hover:scale-90 p-2 bg-primary rounded text-white" href=""><FaFacebookF size={18} /></a>
                                <a className="link link-hover hover:hover:scale-90 p-2 bg-primary rounded text-white" href=""><FaTwitter size={18} /></a>
                            </div>
                            <div className="mt-8">
                                <p className="text-font_tertiary font-roboto uppercase text-base font-bold">Subscribe to our Newsletter</p>
                                <form className="flex mt-4">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="px-3 py-2 text-gray-800 rounded-l-md focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-primary text-white font-bold px-4 py-2 rounded-r-md hover:bg-secondary"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Info and Copyright */}
            <div className="w-full h-[0.2px] bg-gray-500 mt-10 md:mt-16"></div>

            <div className="container mx-auto mt-6 md:mt-8">
                <div className="w-11/12 lg:w-10/12 mx-auto text-center md:text-left text-font_tertiary md:flex justify-between">
                    <p className="text-base font-normal">Copyright &copy; {new Date().getFullYear()} Rokto Bondhon. All right reserved</p>
                    <p className="text-sm font-normal">Designed with ❤️ by Rokto Bondhon Team</p>
                </div>
            </div>
        </footer >

    );
};

export default Footer;