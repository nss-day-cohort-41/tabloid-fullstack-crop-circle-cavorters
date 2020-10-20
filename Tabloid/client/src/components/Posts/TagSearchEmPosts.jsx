import React, { useContext, useEffect, useState } from 'react';
import Post from './Post';
import { PostContext } from "../../providers/PostProvider";
import { Link } from "react-router-dom";

const TagSearchEmPosts = () => {
  const { posts, searchforEmPostTags, getAllPosts} = useContext(PostContext);
  const [ criterion, setCriterion ] = useState("");

//   useEffect(() => {
//     getAllPosts();
//   }, []);

  useEffect(() => {
    searchforEmPostTags(criterion);
  }, []);

  return (
    <>
      <h1>Search for a post via your Tagz</h1>
      <div className="posttag-search__form">
        <input id="search" value={criterion} onChange={e => setCriterion(e.target.value)}/>
        <button onClick={() => searchforEmPostTags(criterion)}>Search</button>
      </div>
      {/* <div className="posts-list"> */}
      <section>
      <div class="postCard">
        <div className="postHeader">
          <h1>Posts</h1>
          <p>
            {/* <Link class="btn btn-primary" to="/posts/add">New Post</Link> */}
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
        {/* {posts.map(post =>
          <Post 
            key={post.id}
            post={post}
            //allowEdit={false}
             />
        )} */}
        {posts.map(p =>
              <Post key={p.id} post={p} allowEdit={false} />
            )}
        </table>
        </div>
      </div>
    </section>
    </>
  );
}

export default TagSearchEmPosts;