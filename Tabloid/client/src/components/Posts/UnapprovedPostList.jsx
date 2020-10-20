
import React, { useContext, useEffect } from "react";
import Post from "./Post";
import { PostContext } from "../../providers/PostProvider";
import { Link } from "react-router-dom";

export default function PostList() {
  const { unapprovedPosts, getAllUnapprovedPosts} = useContext(PostContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));


  useEffect(() => {
    getAllUnapprovedPosts();
  }, []);

  if (sessionUser.userTypeId === 1) {
    return (
      <section>
        <div class="postCard">
          <div className="postHeader">
            <div className="postHeaderDetails">
              <div>
                <h1>Unapproved Posts</h1>
              </div>
              <div>
                <p>
                  <Link class="btn btn-primary" to="/posts/add">New Post</Link>
                </p>
              </div>
            
            </div>
            
          </div>
          <div class="toggle">
            <div>
              <a href="/posts" className="approvedPosts">View All Approved</a>
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
              {unapprovedPosts.map(p =>
                <Post key={p.id} post={p} />
              )}
            </table>
          </div>
        </div>
      </section>
    )
  }
}