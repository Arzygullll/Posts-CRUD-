import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../context/PostContext";

const PostDetail = () => {
  const { id } = useParams();
  const { posts } = useContext(PostContext);
  const post = posts.find((post) => post.id === parseInt(id));

  return (
    <div className="container">
      {post ? (
        <>
          <h2>{post.author}</h2>
          <p>{post.body}</p>
          <img src={post.image} alt={post.author} />
        </>
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
};

export default PostDetail;
