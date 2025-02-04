
const StatCard = ({ icon: Icon, title, count, percentage }) => {
    return (
        <div className="bg-white shadow-md border rounded-xl p-5 lg:py-8 flex items-center gap-5 relative">
            {/* Icon */}
            <div className="p-3 bg-[#ffe8e8] text-primary rounded-xl">
                <Icon size={30} />
            </div>

            {/* Content */}
            <div className="flex flex-col items-start gap-1">
                <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                <h2 className="text-2xl font-bold">{count}</h2>
                <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-md">
                    Trending 📈
                </span>
            </div>
        </div>
    );
};

export default StatCard;