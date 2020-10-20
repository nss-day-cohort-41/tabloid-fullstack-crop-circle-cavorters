
import React, { useContext, useEffect } from "react";
import Post from "./Post";
import { PostContext } from "../../providers/PostProvider";
import { Link } from "react-router-dom";

export default function PostList() {
  const { posts, getAllPosts } = useContext(PostContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('.viewToggle');
  
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        // do this
        console.log('Checked');
      } else {
        // do that
        console.log('Not checked');
      }
    });
  });

  useEffect(() => {
    getAllPosts();
  }, []);

  if (sessionUser.userTypeId === 1) {
    return (
      <section>
        <div class="postCard">
          <div className="postHeader">
            <h1>Posts</h1>
            <p>
              <Link class="btn btn-primary" to="/posts/add">New Post</Link>
            </p>
          </div>
          {sessionUser.userTypeId === 1 ?
            <label class="switch">
              <input className="viewToggle" type="checkbox"/>
              <span class="slider round"></span>
            </label> : null
          }
          
          <div className="post-container">
            <table class="postTable">
              <thead className="postTableHeader">
                <tr>
                  <th className="postApproved-header">
                    Approved
                </th>
                  <th className="postTitle-header">
                    Title
                </th>
                  <th className="postUserName-header">
                    Posted by
                </th>
                  <th className="postCategory-header">
                    Category
                </th>
                  <th className="postDate-header">
                    Publish Date
                </th>
                  <th></th>
                </tr>
              </thead>
              {posts.map(p =>
                <Post key={p.id} post={p} />
              )}
            </table>
          </div>
        </div>
      </section>
    )
  } else {
    return (
    <>
      <div class="postCard">
          <div className="postHeader">
            <h1>Posts</h1>
            <p>
              <Link class="btn btn-primary" to="/posts/add">New Post</Link>
            </p>
          </div>
          <section className="authorPostCards">
            {posts.map(p =>
              <Post key={p.id} post={p} />
            )}
          </section>
      </div>
    </>
    )
  }

}