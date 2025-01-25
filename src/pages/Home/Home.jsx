import { Helmet } from "react-helmet-async";
import Banner from "./component/Banner";
import FeaturedSection from "./component/FeaturedSection";
import ContactUs from "./component/ContactUs";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Rokto Bondhon | Home</title>
            </Helmet>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;