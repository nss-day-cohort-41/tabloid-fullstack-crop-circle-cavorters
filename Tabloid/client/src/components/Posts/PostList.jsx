
import React, { useContext, useEffect } from "react";
import Post from "./Post";
import { PostContext } from "../../providers/PostProvider";
import { Link, useHistory } from "react-router-dom";

export default function PostList() {
  const { unapprovedPosts, posts, getAllPosts, getAllUnapprovedPosts } = useContext(PostContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  

  
  

  useEffect(() => {
    getAllPosts();
  }, []);

  if (sessionUser.userTypeId === 1) {
    return (
      <section>
        <div class="postCard">
          <div className="postHeader">
            <div className="postHeaderDetails">
              <div>
                <h1>Approved Posts</h1>
              </div>
              <div>
                <p>
                  <a class="btn-red" href="/posts/userview">User View</a>
                </p>
              </div>

            </div>

          </div>
          <div class="toggle">
            <div>
              <a href="/posts/unapproved" className="unapprovedPosts">View All Unapproved</a>
            </div>
          </div>
          <div className="post-container">
            <table className="postTable">
              <thead className="postTableHeader">
                <tr>
                  <th className="postTitle-header">
                    Title
                </th>
                  <th className="postUserName-header">
                    Author
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
              <Link class="btn-red" to="/posts/add">New Post</Link>
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