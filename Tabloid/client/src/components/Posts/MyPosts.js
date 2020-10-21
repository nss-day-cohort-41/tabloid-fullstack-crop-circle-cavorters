import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostContext } from "../../providers/PostProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Link } from "react-router-dom";



export default function UserSpecificPosts() {
    const { posts, getAllPostsByUser } = useContext(PostContext);
    const { userProfile } = useContext(UserProfileContext);
    const [user, setUser] = useState([]);
    console.log("userProfile:", userProfile)
    console.log("user:", (JSON.parse(userProfile).displayName))


    useEffect(() => {
        getAllPostsByUser(JSON.parse(userProfile).id);
    }, []);

    console.log("userProfile:", JSON.parse(userProfile));



    return (
        <section>
            <div class="postCard">
                <div className="postHeader">
                    <div className="postHeaderDetails">
                        <div>
                            <h1>{(JSON.parse(userProfile).displayName)}'s Posts</h1>
                        </div>
                        <div>
                            <p>
                                <a class="approvedPosts" href="/posts">All Posts</a>
                            </p>
                        </div>
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

    );

}