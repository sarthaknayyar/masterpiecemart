import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
// import "./Style/Blog.css";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/posts${searchQuery ? `/search/${searchQuery}` : ""}`
        );
        const data = await response.json();
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
        <div className="flex flex-col">

        <header className="header flex-col justify-center">
        <h1 className="header_title flex justify-center bg-gray-200 text-5xl">A Gallery of Inspiration</h1>
        <p className="header_desc flex justify-center text-2xl mt-4">A Blog By MasterPiece Mart</p>
      </header>

        </div>
      
      <div className="container flex flex-col justify-center items-center p-2 text-xl gap-4 mt-4 bg-gray-200">
        <Link to="/api/posts">
        <button type="submit" className="button bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Create Post</button>
        </Link>

        <div className="search_bar text-2xl border-2 border-white rounded-xl">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="input_box"
          />
        </div>
      </div>
      <div className="main_container flex justify-center flex-wrap gap-4 mt-4">
        {posts.map((post) => (
          <Link key={post.id} to={`/api/posts/${post.id}`} className="card_link text-current hover:no-underline">
            <div className="card_container border-gray-200 border-2 rounded-xl overflow-hidden">
              <div className="card_image_container h-52 overflow-hidden">
                <img src={post.img} alt={post.name} className="card_image" />
              </div>
              <div className="card_title_container p-4">
                <h2 className="card_title text-xl font-bold mb-4">{post.name}</h2>
                <p className="card_desc text-lg mb-4">Posted by: {post.postedBy}</p>
                <p className="card_desc text-lg mb-4">
                  Date: {new Date(post.date).toLocaleDateString()}
                </p>
                <p className="card_desc text-lg mb-4">Likes: {post.likeCount}</p>
                <p className="card_desc text-lg mb-4">Views: {post.viewCount}</p>
                <div className="card_tag_container text-md flex">
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
