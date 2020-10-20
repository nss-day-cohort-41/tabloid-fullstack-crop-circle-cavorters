
import React, { useContext, useEffect } from "react";
import Post from "./Post";
import { PostContext } from "../../providers/PostProvider";
import { Link } from "react-router-dom";

export default function PostList() {
  const { unapprovedPosts, posts, getAllPosts, getAllUnapprovedPosts} = useContext(PostContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));


  let val = false;
  
  const togglePosts = () => {   
    if (val == false) {
      console.log('switch to unapproved');
      val = true;
    } else {
      console.log('switch to approved');
      val = false;
    }
  };
  
  let strval = val.toString()
  let checked = strval
  console.log("val:", val)
  console.log("string val:", checked)
  let viewStatus = document.querySelectorAll("#viewToggle");
  let status = viewStatus.value;

  useEffect(() => {
    getAllPosts();
    getAllUnapprovedPosts();
  }, []);

  if (sessionUser.userTypeId === 1) {
    return (
      <section>
        <div class="postCard">
          <div className="postHeader">
            <div className="postHeaderDetails">
              <div>
                <h1>Posts</h1>
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
              <p className="approvedPosts">Approved</p>
            </div>
            <label className="switch">
              <input id="viewToggle" type="checkbox" onclick={togglePosts} value={checked} />
              <span className="slider round"></span>
            </label>
            <div>
              <p className="unapprovedPosts">Unapproved</p>
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
              {status == "false" ?
              posts.map(p =>
                <Post key={p.id} post={p} />
              ) : unapprovedPosts.map(p =>
                <Post key={p.id} post={p} />)}
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