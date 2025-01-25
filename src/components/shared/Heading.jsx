import dividerImg from "../../assets/divider.png";

const Heading = ({ subtitle, title }) => {
    return (
        <div className="flex flex-col items-center mb-10">
            {
                subtitle &&
                <p className="mb-2 text-primary text-base md:text-lg font-semibold">{subtitle}</p>
            }
            <h2 className={`text-3xl md:text-4xl lg:text-[39px] font-bold mb-3 text-center`}>{title}</h2>
            <div className="flex items-center">
                <div className="w-20 h-[2.5px] bg-primary"></div>
                <img src={dividerImg} alt="" />
                <div className="w-20 h-[2.5px] bg-primary"></div>
            </div>
        </div>
    );
};

export default Heading;