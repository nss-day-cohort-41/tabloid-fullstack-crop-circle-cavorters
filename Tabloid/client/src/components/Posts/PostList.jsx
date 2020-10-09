import React, { useContext, useEffect } from "react";
import Post from "./Post";
import { PostContext } from "../../providers/PostProvider";
import { Link } from "react-router-dom";

export default function PostList() {
  const { posts, getAllPosts } = useContext(PostContext);

  const newPost = () => {
    alert("routing to post form...");
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <section>
      <Link
        to={`/posts/add`}>New Post</Link>
      {posts.map(p =>
        <Post key={p.id} post={p} />
      )}
    </section>
  );
}