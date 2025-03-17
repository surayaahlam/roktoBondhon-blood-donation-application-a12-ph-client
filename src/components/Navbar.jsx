import logoImg from "../assets/logo1.png"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logOut } = useAuth();

    const links = <>
        <NavLink
            to="/"
            className={({ isActive }) => `text-lg md:text-base ${isActive ? `font-extrabold text-primary` : 'hover:scale-105 hover:font-semibold'}`}>Home</NavLink>
        {
            user?.email &&
            <NavLink
                to="/dashboard"
                className={({ isActive }) => `text-lg ${isActive ? `font-extrabold text-primary` : 'hover:scale-105 hover:font-semibold'} md:hidden`}>Dashboard</NavLink>
        }
        <NavLink
            to="/donation-requests"
            className={({ isActive }) => `text-lg md:text-base ${isActive ? `font-extrabold text-primary` : 'hover:scale-105 hover:font-semibold'}`}>Donation Requests</NavLink>
        <NavLink
            to="/blog"
            className={({ isActive }) => `text-lg md:text-base ${isActive ? `font-extrabold text-primary` : 'hover:scale-105 hover:font-semibold'}`}>Blog</NavLink>
        {
            user?.email &&
            <NavLink
                to="/funding"
                className={({ isActive }) => `text-lg md:text-base ${isActive ? `font-extrabold text-primary` : 'hover:scale-105 hover:font-semibold'}`}>Funding</NavLink>
        }
        {
            user?.email ?
                (
                    <Link onClick={logOut} className={`text-lg md:hidden hover:scale-105 hover:font-semibold`}>Logout</Link>
                ) :
                (
                    <NavLink
                        to="/login"
                        className={({ isActive }) => `text-lg md:text-base ${isActive ? `font-extrabold text-primary` : 'hover:scale-105 hover:font-semibold'}`}>Login</NavLink>
                )
        }
    </>

    return (
        <div className="py-3 shadow-md bg-base-100 sticky top-0 z-40">
            <div className="container mx-auto">
                <div className="w-11/12 mx-auto">
                    <div className="drawer drawer-end">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <div className="navbar">
                                <div className="mx-2 flex-1 px-2">
                                    <div onClick={() => navigate("/")} className="btn btn-ghost flex items-center hover:bg-transparent px-0">
                                        <img className="w-12 h-12" src={logoImg} alt="logo" />
                                        <h2 className={`text-[22px] md:text-[28px] leading-none font-nunito font-extrabold text-left uppercase`}><span className="text-primary">Rokto</span><br />Bondhon</h2>
                                    </div>
                                </div>
                                <div className="flex-none gap-2">
                                    <ul className="menu menu-horizontal font-medium md:flex gap-5 lg:gap-7 hidden uppercase">
                                        {/* Navbar menu content here */}
                                        {links}
                                    </ul>
                                    {
                                        user?.email &&
                                        <div className="dropdown dropdown-end lg:ml-2">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle border border-primary avatar">
                                                {
                                                    user?.photoURL ?
                                                        <div>
                                                            <img className={`rounded-full`} src={user?.photoURL} alt="" />
                                                        </div>
                                                        :
                                                        <div className="text-primary">
                                                            <FaUserCircle size={45} />
                                                        </div>
                                                }
                                            </div>
                                            <ul
                                                tabIndex={0}
                                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 py-3 px-0 shadow hidden md:flex">
                                                <p className="text-sm ml-5">{user?.displayName}</p>
                                                <p className="text-xs ml-5">{user?.email}</p>
                                                <div className="divider my-[2px]"></div>
                                                <Link to="/dashboard" className={`text-lg md:text-base hover:font-semibold hover:text-primary uppercase hover:bg-[#ffe8e8] mx-2 px-3 py-2 rounded-xl`}>Dashboard</Link>
                                                <Link onClick={logOut} className={`text-lg md:text-base hover:font-semibold hover:text-primary uppercase hover:bg-[#ffe8e8] mx-2 px-3 py-2 rounded-xl`}>Logout</Link>
                                            </ul>
                                        </div>
                                    }
                                </div>
                                <div className="flex-none md:hidden">
                                    <label htmlFor="my-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                        <div className={`btn btn-ghost text-black`}>
                                            <FaBars size={25} />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="drawer-side z-50">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu bg-base-200 text-base-content min-h-full w-60 py-6 pl-7 gap-6">
                                {/* Sidebar content here */}
                                {links}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navbar;