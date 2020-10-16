import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostContext } from "../../providers/PostProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Link, useHistory } from "react-router-dom";


export default function UserSpecificPosts() {
    const history = useHistory();
    const { posts, getAllPostsByUser } = useContext(PostContext);
    const { userProfile } = useContext(UserProfileContext);
    const [user, setUser] = useState();

    useEffect(() => {
        getAllPostsByUser(userProfile.id);
        const currentUser = JSON.parse(userProfile)
        console.log("sessionStorage.userProfile:", sessionStorage.userProfile);

        console.log("userProfile:", JSON.parse(sessionStorage.getItem("userProfile")));

        // const currentUser = JSON.parse(sessionStorage.getItem("userProfile"))
        setUser(currentUser.id)

        console.log("currentUser:", currentUser);
        console.log("currentUser.id:", currentUser.id);
    }, []);

    console.log("sessionStorage.userProfile:", sessionStorage.userProfile);
    console.log("userProfile:", JSON.parse(sessionStorage.getItem("userProfile")));



    return (
        <section>
            <div class="postCard">
                <div className="postHeader">
                    <h1>Posts</h1>
                    <p>
                        <Link class="btn btn-primary" to="/posts/add">New Post</Link>
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