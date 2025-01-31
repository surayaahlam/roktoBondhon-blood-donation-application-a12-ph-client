import { Helmet } from "react-helmet-async";
import Heading from "../components/shared/Heading";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import Loading from "./Loading";

const BlogPage = () => {
    const axiosPublic = useAxios();
    const navigate = useNavigate();

    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ["published-blogs"],
        queryFn: async () => {
            const res = await axiosPublic(`/published-blogs`);
            return res.data;
        }
    });

    if (isLoading) return <Loading></Loading>;

    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>Rokto Bondhon | Blog Page</title>
            </Helmet>
            <div className="w-11/12 lg:w-9/12 mx-auto">
                <Heading subtitle="Blog Page" title="Explore Our Latest Insights and Stories" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="card p-6 rounded-2xl shadow-md flex flex-col gap-3">
                            <img className="w-full h-[230px] object-cover rounded-xl shadow" src={blog?.thumbnail} alt="" />
                            <h2 className="text-xl text-font_primary font-bold">{blog.title}</h2>
                            <div>
                                <button onClick={() => navigate(`/blog/${blog._id}`)} className="btn bg-primary border-none text-white hover:bg-secondary text-sm uppercase px-10">View</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;