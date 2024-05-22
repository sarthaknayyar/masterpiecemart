import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts${searchQuery ? `/search/${searchQuery}` : ""}`
        );
  
        const textResponse = await response.text();
        // console.log("Raw response:", textResponse);
  
        // Attempt to parse the response as JSON
        const data = JSON.parse(textResponse);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
  }, [searchQuery]);
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="my-4">
        <header className="flex flex-col items-center bg-gray-200 p-6 m-6">
          <h1 className="text-5xl font-bold">A Gallery of Inspiration</h1>
          <p className="text-2xl mt-4">A Blog By MasterPiece Mart</p>
        </header>

        <div className="container mx-auto p-4 text-xl mt-4 bg-gray-200 rounded-md shadow-md">
          <Link to="/api/posts" className="flex justify-center ">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 flex "
            >
              Create Post
            </button>
          </Link>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-2 border-2 border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/api/posts/${post.id}`}
              className="block hover:no-underline "
            >
              <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-52 overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{post.name}</h2>
                  <p className="text-gray-600 mb-2">Posted by: {post.postedBy}</p>
                  <p className="text-gray-600 mb-2">
                    Date: {new Date(post.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-2">Likes: {post.likeCount}</p>
                  <p className="text-gray-600 mb-2">Views: {post.viewCount}</p>
                  <div className="text-sm text-gray-600">
                    Tags: {post.tags.join(", ")}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blog;
