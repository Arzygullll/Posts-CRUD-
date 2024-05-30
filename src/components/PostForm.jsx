import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../context/PostContext";
import axios from "axios";
import { API } from "../helpers/const";

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(PostContext);
  const [formData, setFormData] = useState({
    body: "",
    author: "",
    image: "",
    like: false,
  });

  useEffect(() => {
    if (id) {
      const postToEdit = posts.find((post) => post.id === parseInt(id));
      if (postToEdit) {
        setFormData(postToEdit);
      }
    }
  }, [id, posts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update post
        const updatedPost = { ...formData, id: parseInt(id) };
        await axios.put(`${API}/${id}`, updatedPost);
        const updatedPosts = posts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        );
        setPosts(updatedPosts);
      } else {
        // Create new post
        const newPost = { ...formData, id: Date.now() };
        await axios.post("http://localhost:8000/posts", newPost);
        setPosts([...posts, newPost]);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <div className="container">
      <h2>{id ? "Edit Post" : "Create Post"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Body:</label>
          <textarea
            className="form-control"
            name="body"
            value={formData.body}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default PostForm;
