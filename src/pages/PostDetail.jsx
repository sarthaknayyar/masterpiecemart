import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "./CommentForm"; 
import "./Style/PostDetail.css"; 
import Navbar from "../components/Navbar";

function PostDetail() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [postedBy, setPostedBy] = useState(""); 
  const { id } = useParams();

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = () => {
    fetch(`http://localhost:8080/api/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error("Error fetching post:", error));
  };

  const fetchComments = () => {
    fetch(`http://localhost:8080/api/comments/${id}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handlePostedByChange = (event) => {
    setPostedBy(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();

    const params = new URLSearchParams({
      postId: id,
      postedBy: postedBy,
      content: newComment,
    });

    fetch(`http://localhost:8080/api/comments/create?${params.toString()}`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to add comment");
      })
      .then((data) => {
        setComments([...comments, data]);
        setNewComment("");
        setPostedBy("");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  const handleLike = () => {
    fetch(`http://localhost:8080/api/posts/${id}/like`, {
      method: "PUT",
    })
      .then((response) => {
        if (response.ok) {
          setPost((prevPost) => ({
            ...prevPost,
            likeCount: prevPost.likeCount + 1,
          }));
        } else {
          throw new Error("Failed to like post");
        }
      })
      .catch((error) => {
        console.error("Error liking post:", error);
      });
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
        <Navbar />
    <div className="container">
      <div className="post">
        <h2>{post.name}</h2>
        <img src={post.img} alt={post.name} />
        <br />
        <br />
        <p>{post.content}</p>
        <p>Posted by: {post.postedBy}</p>
        <p>Date: {new Date(post.date).toLocaleDateString()}</p>
        <p>
          Like : {post.likeCount} <button onClick={handleLike}>❤️</button>
        </p>
        <p>View : {post.viewCount} 👁️‍🗨️</p>
        <p>Tags : {post.tags.join(", ")}</p>
      </div>

      <div className="comments">
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul>
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmitComment} className="comment-form">
          <textarea
          className="border-2 border-black"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Write your comment here..."
          />
          <br />
          <br />
          {/* <input
            type="text"
            value={postedBy}
            onChange={handlePostedByChange}
            placeholder="Your name"
          /> */}
          <br />
          <br />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default PostDetail;
