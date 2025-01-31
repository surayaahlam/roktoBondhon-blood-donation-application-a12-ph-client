import { Helmet } from "react-helmet-async";
import Heading from "../components/shared/Heading";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const BlogDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxios();

    const { data: blog = [], isLoading } = useQuery({
        queryKey: ['view-blog', id],
        enabled: !!id,
        queryFn: async () => {
            const response = await axiosPublic(`/published-blog/${id}`);
            return response.data;
        }
    });

    if (isLoading) return <Loading />
    return (
        <div className="container mx-auto mt-10 mb-28">
            <Helmet>
                <title>Rokto Bondhon | Blog Details</title>
            </Helmet>
            <div className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto">
                <Heading title="Blog Details" />
                <div className="card p-8 shadow-md rounded-2xl flex flex-col gap-5">
                    <img className="w-full h-[500px] object-cover rounded-xl" src={blog.thumbnail} alt="" />
                    <h2 className="text-3xl md:text-4xl lg:text-3xl font-bold">{blog.title}</h2>
                    <div
                        className="flex flex-col text-lg text-font_secondary font-nunito font-medium"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    ></div>

                </div>
            </div>
        </div >
    );
};

export default BlogDetails;