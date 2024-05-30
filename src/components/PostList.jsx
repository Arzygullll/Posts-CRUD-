import React, { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import { Link } from "react-router-dom";
import axios from "axios";
import LikeButton from "./LikeButton";
import "./PostList.css";
import { API } from "../helpers/const";

const PostList = () => {
  const { posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [setPosts]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="container">
      <h2>All Posts</h2>
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4" key={post.id}>
            <div className="card post-card mb-4">
              <div className="card-body">
                <h5 className="card-title">{post.author}</h5>
                <img
                  src={post.image}
                  className="card-img-top"
                  alt={post.author}
                />
                <p className="card-text">{post.body}</p>
                <div className="post-actions">
                  <LikeButton post={post} />
                  <Link
                    to={`/post/${post.id}`}
                    className="btn btn-primary ml-2"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/edit/${post.id}`}
                    className="btn btn-warning ml-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
