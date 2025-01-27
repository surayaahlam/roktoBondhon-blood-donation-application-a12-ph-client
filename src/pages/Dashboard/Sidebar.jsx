import { Link } from "react-router-dom";
import logoImg from "../../assets/logo1.png";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Sidebar = () => {
    const { user } = useAuth();
    const [role] = useRole();

    return (
        <div className="w-60 md:w-56 lg:w-72 bg-primary min-h-screen">
            <div className="hidden m-2 p-2 lg:py-3 rounded-lg md:flex items-center bg-white gap-2 lg:gap-4">
                <img className="w-12 h-12" src={logoImg} alt="logo" />
                <h2 className={`text-[22px] lg:text-[28px] leading-none font-nunito font-extrabold text-left uppercase`}><span className="text-primary">Rokto</span><br />Bondhon</h2>
            </div>
            <div className="m-2">
                <div className="py-2 pl-2 md:pl-0 lg:pl-2 flex items-center gap-3 md:gap-2 lg:gap-3">
                    <img className={`rounded-full w-14 h-14`} src={user?.photoURL} alt="" />
                    <div className="text-white flex flex-col">
                        <h4 className="text-base font-medium">{user?.displayName}</h4>
                        <p className="text-xs font-normal">{role}</p>
                        <Link to="/dashboard/profile" className="link link-hover text-sm font-semibold">View Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;