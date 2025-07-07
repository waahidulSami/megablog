import React from "react";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  const validTitle =
    typeof title === "string" && title.trim().length > 0;

  return (
    <Link to={`/post/${$id}`} >
    <div className="w-full max-w-sm p-4 border rounded shadow bg-white">
      {featuredImage ? (
        <img
          src={featuredImage}
          alt={validTitle ? title : "Post image"}
          className="w-full h-40 object-cover rounded"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x200?text=No+Image"; // ✅ নতুন, working fallback
          }}
        />
      ) : (
        <img
          src="https://placehold.co/400x200?text=No+Image"
          alt="No Image"
          className="w-full h-40 object-cover rounded"
        />
      )}

      <h2 className="text-lg font-semibold mt-2 break-words">
        {validTitle ? title : "Untitled Post"}
      </h2>
    </div>
    </Link>
  );
}

export default PostCard;
