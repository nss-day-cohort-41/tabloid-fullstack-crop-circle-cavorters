import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostContext } from "../../providers/PostProvider";
import { Link, useHistory } from "react-router-dom";

export default function UserSpecificPosts() {
    const history = useHistory();
    const { post, posts, getAllPostsByUser } = useContext(PostContext);
    const [user, setUser] = useState();


    useEffect(() => {
        getAllPostsByUser();
        const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))
        setUser(currentUser.id)
    }, []);




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
                            <Post key={p.id} post={p} user={user} />
                        )}
                    </table>
                </div>
            </div>
        </section>

    );

}