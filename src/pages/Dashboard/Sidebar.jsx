import logoImg from "../../assets/logo1.png";

const Sidebar = () => {
    return (
        <div className="w-60 md:w-56 lg:w-72 bg-primary min-h-screen">
            <div className="hidden m-2 p-2 lg:py-3 rounded-lg md:flex items-center bg-white gap-2 lg:gap-4">
                <img className="w-12 h-12" src={logoImg} alt="logo" />
                <h2 className={`text-[22px] lg:text-[28px] leading-none font-nunito font-extrabold text-left uppercase`}><span className="text-primary">Rokto</span><br />Bondhon</h2>
            </div>
        </div>
    );
};

export default Sidebar;