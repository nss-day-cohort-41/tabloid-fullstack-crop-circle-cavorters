import React, { useContext, useEffect } from "react";
import Post from "./Post";
import { PostContext } from "../../providers/PostProvider";
import { Link } from "react-router-dom";

export default function UserSpecificPosts() {
    const { post, posts, getAllPostsByUser } = useContext(PostContext);
    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

    useEffect(() => {
        getAllPostsByUser(JSON.parse(sessionStorage.getItem("userProfile")).id);
    }, []);

    // if (sessionUser.id === post.userProfileId) {


    return (
        <section>
            <div class="postCard">
                <div className="postHeader">
                    <h1>Posts</h1>
                    <p>
                        <Link class="btn btn-primary" to="/posts/add">New Post</Link>
                    </p>
                    <p>
                        <Link class="btn btn-primary" to="/posts/myposts">My Posts</Link>
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
                            <Post key={p.id} post={p} />
                        )}
                    </table>
                </div>
            </div>
        </section>

    );
    // } 
}