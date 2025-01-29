import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/logo1.png";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { FaHome, FaSignOutAlt, FaHandHoldingWater, FaUsers } from "react-icons/fa";
import { MdBloodtype, MdFiberNew, MdNewspaper } from "react-icons/md";
import { PiScrollFill } from "react-icons/pi";
import { GiReceiveMoney } from "react-icons/gi";

const Sidebar = () => {
    const { user, logOut } = useAuth();
    const [, userData] = useRole();
    const [role] = useRole();

    return (
        <div className="w-60 md:w-56 lg:w-72 bg-primary min-h-screen flex-none">
            {/* Logo */}
            <div className="hidden m-2 p-2 lg:py-3 rounded-lg md:flex items-center bg-white gap-2 lg:gap-4">
                <img className="w-12 h-12" src={logoImg} alt="logo" />
                <h2 className={`text-[22px] lg:text-[28px] leading-none font-nunito font-extrabold text-left uppercase`}><span className="text-primary">Rokto</span><br />Bondhon</h2>
            </div>

            {/* View Profile */}
            <div className="m-2 mb-4">
                <div className="py-2 pl-2 md:pl-0 lg:pl-2 flex items-center gap-3 md:gap-2 lg:gap-3">
                    <div className="avatar w-14 h-14 relative">
                        <img className={`rounded-full`} src={user?.photoURL} alt="" />
                        {
                            userData?.status === "blocked" 
                            ?
                            <span className="absolute top-0 right-0.5 w-3.5 h-3.5 bg-red-700 rounded-full border-2 border-white"></span>
                            :
                            <span className="absolute top-0 right-0.5 w-3.5 h-3.5 bg-green-600 rounded-full border-2 border-white"></span>
                        }
                    </div>
                    <div className="text-white flex flex-col">
                        <h4 className="text-base font-medium">{user?.displayName}</h4>
                        <p className="text-xs font-normal">{role}</p>
                        <Link to="/dashboard/profile" className="link link-hover text-sm font-semibold">View Profile</Link>
                    </div>
                </div>
            </div>

            {/* Links */}
            <div>
                <NavLink to="/dashboard" end className={({ isActive }) => `text-base lg:text-lg text-white ${isActive ? `bg-button font-semibold` : 'hover:font-bold'} rounded-lg flex items-center gap-2 lg:gap-3 m-2 py-2 pl-3 md:pl-2 lg:px-3`}>
                    <FaHome />
                    Dashboard Home
                </NavLink>
                {
                    role === "Donor" && <>
                        <NavLink to="/dashboard/my-donation-requests" className={({ isActive }) => `text-base lg:text-lg text-white ${isActive ? `bg-button font-semibold` : 'hover:font-bold'} rounded-lg flex items-center gap-2 lg:gap-3 m-2 py-2 pl-3 md:pl-2 lg:px-3`}>
                            <MdBloodtype />
                            My Donation Requests
                        </NavLink>

                        <NavLink to="/dashboard/create-donation-request" className={({ isActive }) => `text-base lg:text-lg text-white ${isActive ? `bg-button font-semibold` : 'hover:font-bold'} rounded-lg flex items-center gap-2 lg:gap-3 m-2 py-2 pl-3 md:pl-2 lg:px-3`}>
                            <MdFiberNew />
                            Create Donation Request
                        </NavLink>
                    </>
                }
                {
                    role === "Admin" && <>
                        <NavLink to="/dashboard/all-users" className={({ isActive }) => `text-base lg:text-lg text-white ${isActive ? `bg-button font-semibold` : 'hover:font-bold'} rounded-lg flex items-center gap-2 lg:gap-3 m-2 py-2 pl-3 md:pl-2 lg:px-3`}>
                            <FaUsers />
                            All Users
                        </NavLink>

                        <NavLink to="/dashboard/all-blood-donation-request" className={({ isActive }) => `text-base lg:text-lg text-white ${isActive ? `bg-button font-semibold` : 'hover:font-bold'} rounded-lg flex items-center gap-2 lg:gap-3 m-2 py-2 pl-3 md:pl-2 lg:pl-3`}>
                            <MdBloodtype />
                            All Blood Donation Request
                        </NavLink>

                        <NavLink to="/dashboard/content-management" className={({ isActive }) => `text-base lg:text-lg text-white ${isActive ? `bg-button font-semibold` : 'hover:font-bold'} rounded-lg flex items-center gap-2 lg:gap-3 m-2 py-2 pl-3 md:pl-2 lg:px-3`}>
                            <PiScrollFill />
                            Content Management
                        </NavLink>
                    </>
                }
                {
                    role === "Volunteer" && <>
                        <NavLink to="/dashboard/all-blood-donation-request" className={({ isActive }) => `text-base lg:text-lg text-white ${isActive ? `bg-button font-semibold` : 'hover:font-bold'} rounded-lg flex items-center gap-2 lg:gap-3 m-2 py-2 pl-3 md:pl-2 lg:pl-3`}>
                            <MdBloodtype />
                            All Blood Donation Request
                        </NavLink>

                        <NavLink to="/dashboard/content-management" className={({ isActive }) => `text-base lg:text-lg text-white ${isActive ? `bg-button font-semibold` : 'hover:font-bold'} rounded-lg flex items-center gap-2 lg:gap-3 m-2 py-2 pl-3 md:pl-2 lg:px-3`}>
                            <PiScrollFill />
                            Content Management
                        </NavLink>
                    </>
                }

                <div className="w-full h-[0.1px] bg-gray-100 my-5"></div>

                <Link to="/" className={`text-base lg:text-lg text-white hover:font-bold flex items-center gap-2 lg:gap-3 m-2 py-2 pl-3 md:pl-2 lg:px-3`}>
                    <FaHome />
                    Home
                </Link>
                <Link to="/donation-requests" className={`text-base lg:text-lg text-white hover:font-bold flex items-center gap-2 lg:gap-3 m-2 py-2 pl-3 md:pl-2 lg:px-3`}>
                    <FaHandHoldingWater />
                    Donation Requests
                </Link>
                <Link to="/blog" className={`text-base lg:text-lg text-white hover:font-bold flex items-center gap-2 lg:gap-3 m-2 py-2 pl-3 md:pl-2 lg:px-3`}>
                    <MdNewspaper />
                    Blog
                </Link>
                <Link to="/funding" className={`text-base lg:text-lg text-white hover:font-bold flex items-center gap-2 lg:gap-3 m-2 py-2 pl-3 md:pl-2 lg:px-3`}>
                    <GiReceiveMoney />
                    Funding
                </Link>
                <Link onClick={logOut} className={`text-base lg:text-lg text-white hover:font-bold flex items-center gap-2 lg:gap-3 m-2 py-2 pl-3 md:pl-2 lg:px-3`}>
                    <FaSignOutAlt />
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;