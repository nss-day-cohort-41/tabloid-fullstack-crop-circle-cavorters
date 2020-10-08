import React, { useContext, useEffect } from "react";
import Post from "./Post";
import { PostContext } from "../../providers/PostProvider";
import { Button } from "reactstrap";

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
      <Button
        onClick={newPost}

      >NewPost</Button>
      {posts.map(p =>
        <Post key={p.id} post={p} />
      )}
    </section>
  );
}