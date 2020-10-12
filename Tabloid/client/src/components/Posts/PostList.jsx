import React, { useContext, useEffect } from "react";
import Post from "./Post";
import { PostContext } from "../../providers/PostProvider";
import { Link } from "react-router-dom";

export default function PostList() {
  const { posts, getAllPosts } = useContext(PostContext);

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <section>
      <div class="postCard">
        <div className="postHeader">
          <h1>Posts</h1>
          <p>
              <a class="btn btn-primary" action="Create">New Post</a>
          </p>
        </div>
        <div className="post-container">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>
                Title
              </th>
              <th>
                Posted by
              </th>
              <th>
                Category
              </th>
              <th>
                Publish Date
              </th>
              <th></th>
            </tr>
          </thead>
          {posts.map(p =>
            <Post key={p.id} post={p}/>
          )}
        </table>
      </div>
      </div>
    </section>
  );
}