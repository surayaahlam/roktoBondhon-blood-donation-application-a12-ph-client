import JoditEditor from "jodit-react";
import { Helmet } from "react-helmet-async";
import { imageUpload } from "../../../api/utils";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const editorConfig = {
        placeholder: "Write your blog content here...",
        askBeforePasteHTML: false,
        defaultActionOnPaste: "insert_clear_html"
    };
    const [loading, setLoading] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const title = form.title.value;
        const image = form.image.files[0];
        const content = form.content.value;

        const thumbnail = await imageUpload(image);

        const newBlog = {
            title,
            thumbnail,
            content
        };

        try {
            const { data } = await axiosSecure.post('/blogs', newBlog);
            if (data.insertedId) {
                setLoading(false);
                Swal.fire({
                    title: "Success",
                    text: "Blog created successfully!",
                    icon: "success",
                    timer: 2000,
                    willClose: () => {
                        e.target.reset();
                        navigate("/dashboard/content-management");
                    },
                });
            };
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to create a blog",
                icon: "error",
            });
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="mb-8 md:mb-6">
            <Helmet>
                <title>Rokto Bondhon | Add Blog</title>
            </Helmet>

            <div className={`card w-full shrink-0`}>
                <form onSubmit={handleCreate} className="card-body p-2 md:p-4 lg:px-10">
                    <h2 className="text-2xl md:text-[26px] lg:text-3xl font-bold text-primary mb-2">Add Blog</h2>

                    <div className="w-full lg:flex lg:items-center lg:gap-10">
                        {/* Title Of The Blog */}
                        <div className="form-control lg:flex-auto lg:w-1/2">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Title</span>
                            </label>
                            <input
                                name="title"
                                type="text"
                                placeholder="Enter the title of the blog"
                                className={`input input-bordered border-primary`}
                                required />
                        </div>

                        {/* Thumbnail Image */}
                        <div className="form-control lg:flex-auto lg:w-1/2">
                            <label className="label">
                                <span className="label-text lg:text-base font-medium">Thumbnail Image</span>
                            </label>
                            <input
                                name="image"
                                type="file"
                                className="file-input file-input-bordered border-primary file:bg-primary file:hover:bg-secondary file:border-none file:text-white"
                                required
                            />
                        </div>
                    </div>

                    {/* Blog Content */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text lg:text-base font-medium">Content</span>
                        </label>
                        <JoditEditor
                            name="content"
                            config={editorConfig} />
                    </div>

                    {/* Create Button */}
                    <button
                        type="submit"
                        className="btn bg-primary border-none text-white hover:bg-font_quaternary text-base uppercase px-10 mt-4"
                    >
                        {
                            loading
                                ? <span className="loading loading-spinner loading-xs text-white"></span>
                                : "Create"
                        }
                    </button>
                </form>
            </div >

        </div>
    );
};

export default AddBlog;