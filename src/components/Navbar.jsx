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
            className={({ isActive }) => `text-lg lg:text-base ${isActive ? `font-extrabold text-primary` : 'hover:scale-105'}`}>Home</NavLink>
        <NavLink
            to="/marathons"
            className={({ isActive }) => `text-lg lg:text-base ${isActive ? `font-extrabold text-primary` : 'hover:scale-105'}`}>Marathons</NavLink>
        {
            user?.email &&
            <NavLink
                to="/dashboard"
                className={({ isActive }) => `text-lg lg:text-base ${isActive ? `font-extrabold text-primary` : 'hover:scale-105'}`}>Dashboard</NavLink>
        }
        {
            user?.email ?
                (
                    <Link onClick={logOut} className={`text-lg lg:hidden hover:scale-105`}>Logout</Link>
                ) :
                (
                    <>
                        <NavLink
                            to="/login"
                            className={({ isActive }) => `text-lg lg:text-base ${isActive ? `font-extrabold text-primary` : 'hover:scale-105'}`}>Login</NavLink>
                        <NavLink
                            to="/register"
                            className={({ isActive }) => `text-lg lg:text-base ${isActive ? `font-extrabold text-primary` : 'hover:scale-105'}`}>Register</NavLink>
                    </>
                )

        }
    </>

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Navbar;