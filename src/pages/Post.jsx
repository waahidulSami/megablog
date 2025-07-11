import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (postId) {
      service.getPost(postId).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    }
  }, [postId, navigate]);

  useEffect(() => {
    async function fetchImage() {
      if (post?.featuredImage) {
        const url = await service.getFilepreview(post.featuredImage);
        if (url) setImageUrl(url);
        else setImageUrl("https://placehold.co/800x400?text=No+Image");
      } else {
        setImageUrl("https://placehold.co/800x400?text=No+Image");
      }
    }
    fetchImage();
  }, [post]);

  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    if (post?.authorName) {
      setAuthorName(post.authorName);
    } else {
      setAuthorName("Unknown");
    }
  }, [post]);

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log(post);

  const delteall = async () => {
    try {
      console.log("Attempting to delete post:", post.$id);
      await service.deletePost(post.$id);
      console.log("Post deleted successfully.");
      if (post.featuredImage) {
        await service.deltefile(post.featuredImage);
        console.log("Image deleted successfully.");
      }
      navigate("/");
    } catch (error) {
      console.error("Error deleting post or file:", error);
      alert("Something went wrong while deleting the post.");
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium text-white bg-indigo-600 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-gray-500 ml-3">
                {new Date(post.$createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <span className="text-indigo-600 font-semibold text-lg">
                    {authorName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{authorName}</p>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </div>
              <div className="text-gray-500 text-sm flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>5 min read</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-10 relative">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              {imageUrl ? (
                <div className="w-full max-h-[80vh] overflow-hidden rounded-xl shadow-xl relative bg-gray-100">
                  <img
                    src={imageUrl}
                    alt={post.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No Image Available</p>
                </div>
              )}

              {/* Action Buttons for Author */}
              {isAuthor && (
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="bg-green-500" className="w-20 h-10">
                      Edit
                    </Button>
                  </Link>
                  <Button className="bg-red-600 w-20 h-10 " onClick={delteall}>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-900 leading-relaxed text-xl">
              {parse(post.content)}
            </div>
          </div>
        </article>
      </main>

      {/* Custom CSS for content styling */}
   
    </div>
  );
}
