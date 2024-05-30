import React from "react";
import { Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostList from "../components/PostList";
import PostDetail from "../components/PostDetail";
import PostForm from "../components/PostForm";

const MainRoutes = () => {
  return (
    <>
      <Navbar />
      <Route path="/" exact component={PostList} />
      <Route path="/post/:id" component={PostDetail} />
      <Route path="/create" component={PostForm} />
      <Route path="/edit/:id" component={PostForm} />
    </>
  );
};

export default MainRoutes;
