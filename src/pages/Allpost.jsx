import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { PostCard } from "../components";

function AllPost() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => {
        console.log("Error fetching posts:", error);
      });
  }, []);

  const filteredPosts = posts.filter(
    (post) => selectedCategory === "All" || post.category === selectedCategory
  );

  const categories = [
     "All",
  "Technology",
  "Health",
  "Travel",
  "Food",
  "Lifestyle",
  "Business",
  "Entertainment",
  "Finance",
  "Education",
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-['Poppins',sans-serif] px-4 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Blog Posts</h1>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="w-full h-px bg-gray-200 mt-8"></div>
        </header>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard
                key={post.$id}
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
                category={post.category}
                userId={post.userId}
                $createdAt={post.$createdAt}
                  authorName={post.authorName} 
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-lg">
              No posts found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllPost;
