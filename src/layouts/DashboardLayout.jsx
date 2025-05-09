import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar";
import logoImg from "../assets/logo1.png";
import { FaBars } from "react-icons/fa";

const DashboardLayout = () => {
    const navigate = useNavigate();

    return (
        <div className="drawer drawer-end font-roboto">
            <input id="my-dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div>
                {/* Mobile content*/}
                <div className='md:hidden'>
                    <div className="bg-base-100 shadow-md ">
                        <div className="w-11/12 mx-auto flex justify-between py-4">
                            <div onClick={() => navigate("/")} className="btn btn-ghost flex items-center hover:bg-transparent px-0">
                                <img className="w-12 h-12" src={logoImg} alt="logo" />
                                <h2 className={`text-[22px] leading-none font-nunito font-extrabold text-left uppercase`}><span className="text-primary">Rokto</span><br />Bondhon</h2>
                            </div>
                            <label htmlFor="my-dashboard-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <div className={`text-primary`}>
                                    <FaBars size={25} />
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="w-11/12 mx-auto py-4">
                        <Outlet></Outlet>
                    </div>
                </div>

                {/* Page Content excluding mobile */}
                <div className="hidden md:flex min-h-screen">
                    <Sidebar></Sidebar>

                    <div className='flex-1'>
                        <div className='p-4 lg:p-8 '>
                            <Outlet></Outlet>
                        </div>
                    </div>
                </div>
            </div>


            <div className="drawer-side md:hidden z-50">
                <label htmlFor="my-dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <Sidebar></Sidebar>
            </div>
        </div>
    );
};

export default DashboardLayout;