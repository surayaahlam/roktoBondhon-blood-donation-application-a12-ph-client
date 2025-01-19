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
            className={({ isActive }) => `text-lg md:text-base ${isActive ? `font-extrabold text-primary` : 'hover:scale-110 hover:font-semibold'}`}>Home</NavLink>
        {
            user?.email &&
            <NavLink
                to="/dashboard"
                className={({ isActive }) => `text-lg ${isActive ? `font-extrabold text-primary` : 'hover:scale-110 hover:font-semibold'} md:hidden`}>Dashboard</NavLink>
        }
        <NavLink
            to="/marathons"
            className={({ isActive }) => `text-lg md:text-base ${isActive ? `font-extrabold text-primary` : 'hover:scale-110 hover:font-semibold'}`}>Donation Requests</NavLink>
        <NavLink
            to="/marathons"
            className={({ isActive }) => `text-lg md:text-base ${isActive ? `font-extrabold text-primary` : 'hover:scale-110 hover:font-semibold'}`}>Blog</NavLink>
        {
            user?.email &&
            <NavLink
                to="/dashboard"
                className={({ isActive }) => `text-lg md:text-base ${isActive ? `font-extrabold text-primary` : 'hover:scale110 hover:font-semibold'}`}>Funding</NavLink>
        }
        {
            user?.email ?
                (
                    <Link onClick={logOut} className={`text-lg md:hidden hover:scale-110 hover:font-semibold`}>Logout</Link>
                ) :
                (
                    <NavLink
                        to="/login"
                        className={({ isActive }) => `text-lg md:text-base ${isActive ? `font-extrabold text-primary` : 'hover:scale-110 hover:font-semibold'}`}>Login</NavLink>
                )
        }
    </>

    return (
        <div className="py-3 shadow-md">
            <div className="container mx-auto">
                <div className="w-11/12 mx-auto">
                    <div className="drawer drawer-end">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <div className="navbar bg-base-100">
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
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                                <div className="ml-4">
                                                    {
                                                        user?.photoURL ?
                                                            <div>
                                                                <img className={`w-12 h-12 md:w-[52px] md:h-[52px] rounded-full`} src={user?.photoURL} alt="" />
                                                            </div>
                                                            :
                                                            <div className="text-black">
                                                                <FaUserCircle size={45} />
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                            <ul
                                                tabIndex={0}
                                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow hidden md:block">
                                                <Link to="/dashboard" className={`text-base`}>Dashboard</Link>
                                                <Link onClick={logOut} className={`text-base`}>Logout</Link>
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
                            <ul className="menu bg-base-200 text-base-content min-h-full w-60 py-6 pl-10 gap-6">
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