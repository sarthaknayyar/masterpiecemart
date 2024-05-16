import React from "react";

function CommentForm({ comment }) {
  const commentStyle = {
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
  };

  const contentStyle = {
    fontSize: "14px",
    color: "#555",
  };

  return (
    <div style={commentStyle}>
      <p style={contentStyle}>{comment.content}</p>
    </div>
  );
}

export default CommentForm;