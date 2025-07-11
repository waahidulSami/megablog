import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";

function PostCard({ $id, title, featuredImage, category, authorName, $createdAt }) {
  const [imageUrl, setImageUrl] = useState("https://placehold.co/400x200?text=No+Image");

  useEffect(() => {
    if (featuredImage) {
      service.getFilepreview(featuredImage).then((url) => {
        if (url) setImageUrl(url);
      });
    }
  }, [featuredImage]);

  const validTitle = typeof title === "string" && title.trim().length > 0;
  const formattedDate = new Date($createdAt).toLocaleDateString("en-BD", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link to={`/post/${$id}`} className="group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer">
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={validTitle ? title : "Post image"}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/400x200?text=No+Image";
            }}
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <span className="text-xs font-medium px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full w-fit mb-2">
            {category || "Unknown"}
          </span>

          <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">
            {validTitle ? title : "Untitled Post"}
          </h2>

          <p className="text-sm text-gray-500">👤 {authorName || "Unknown"}</p>
          <p className="text-sm text-gray-500 mt-auto">📅 {formattedDate}</p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
