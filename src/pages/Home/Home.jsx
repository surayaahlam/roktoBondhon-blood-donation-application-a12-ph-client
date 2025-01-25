import { Helmet } from "react-helmet-async";
import Banner from "./component/Banner";
import FeaturedSection from "./component/FeaturedSection";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Rokto Bondhon | Home</title>
            </Helmet>
            <Banner></Banner>
            <FeaturedSection></FeaturedSection>

        </div>
    );
};

export default Home;