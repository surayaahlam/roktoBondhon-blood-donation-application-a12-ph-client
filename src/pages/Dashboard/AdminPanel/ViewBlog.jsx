import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";

const ViewBlog = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: blog, isLoading } = useQuery({
        queryKey: ['view-blog', id],
        enabled: !!id,
        queryFn: async () => {
            const response = await axiosSecure.get(`/view-blog/${id}`);
            return response.data;
        }
    });

    if (isLoading) return <Loading />
    return (
        <div className="mb-8 md:mb-6">
            <Helmet>
                <title>Rokto Bondhon | View Blog</title>
            </Helmet>

            <div className="flex items-center justify-between mb-5 lg:mb-8 mt-2 md:mt-4 mx-2 md:mx-4 lg:mx-8">
                <h2 className="text-2xl md:text-[26px] lg:text-3xl font-bold text-primary">View Blog</h2>
            </div>

            <div className="p-2 md:p-4 lg:px-8 flex flex-col gap-5">
                <img className="w-[400px] lg:w-[500px]" src={blog.thumbnail} alt="" />
                <h3 className="text-2xl md:text-[26px] lg:text-3xl font-bold">{blog.title}</h3>
                <div
                    className="flex flex-col text-base text-font_secondary font-nunito font-medium"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                ></div>
            </div>
        </div>
    );
};

export default ViewBlog;