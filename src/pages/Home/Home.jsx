import { Helmet } from "react-helmet-async";
import Banner from "./component/Banner";
import FeaturedSection from "./component/FeaturedSection";
import ContactUs from "./component/ContactUs";
import HowItWorks from "./component/HowItWorks";
import Testimonials from "./component/Testimonials";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Rokto Bondhon | Home</title>
            </Helmet>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;