import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import ScrollToTop from "../components/shared/ScrollToTop";

const MainLayout = () => {
    const { user } = useAuth();
    return (
        <div className="font-roboto">
            <ScrollToTop />
            <Navbar></Navbar>
            <div className={`${user?.email ? "min-h-[calc(100vh-690.7px)]" : "min-h-[calc(100vh-685.9px)]"}`}>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;