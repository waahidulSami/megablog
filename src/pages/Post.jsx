import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";



export default function Post() {
    const [post, setPost] = useState(null);
    const { postId } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (postId) {
            service.getPost(postId).then((post) => {
                if (post) setPost(post);
                else navigate('/');
            });
        }
    }, [postId, navigate]);

const delteall = async () => {
    try {
        console.log("Attempting to delete post:", post.$id);
        await service.deletePost(post.$id); // Delete document first
        console.log("Post deleted successfully.");

        // Then try to delete image file
        if (post.featuredImage) {
            await service.deltefile(post.featuredImage); // No need to wait if it fails
            console.log("Image deleted successfully.");
        }

        navigate("/"); // Redirect after delete
    } catch (error) {
        console.error("Error deleting post or file:", error);
        alert("Something went wrong while deleting the post.");
    }
};


    // ✅ Loading state check before rendering
    if (!post) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="py-8">
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={service.getFilepreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-xl"
                />

                {isAuthor && (
                    <div className="absolute right-5 top-6 flex justify-center items-center flex-col ">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="w-20 h-10">
                                Edit
                            </Button>
                        </Link>
                        <Button 
                         className="   bg-red-600 w-20 h-10" 
                         onClick={delteall}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>

            <div className="w-full">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>

            <div className="browser-css">{parse(post.content)}</div>
        </div>
    );
}
