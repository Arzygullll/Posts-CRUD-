import React, { useContext } from "react";
import { PostContext } from "../context/PostContext";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./LikeButton.css";

const LikeButton = ({ post }) => {
  const { posts, setPosts } = useContext(PostContext);

  const toggleLike = async () => {
    const updatedPost = { ...post, like: !post.like };
    try {
      await axios.put(`http://localhost:8000/posts/${post.id}`, updatedPost);
      const updatedPosts = posts.map((p) =>
        p.id === post.id ? updatedPost : p
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  return (
    <button className="btn btn-link like-button" onClick={toggleLike}>
      {post.like ? <FaHeart className="liked" /> : <FaRegHeart />}
    </button>
  );
};

export default LikeButton;
