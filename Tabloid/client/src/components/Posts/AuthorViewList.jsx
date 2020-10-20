
import React, { useContext, useEffect } from "react";
import AuthorView from "./AuthorView";
import { PostContext } from "../../providers/PostProvider";
import { Link } from "react-router-dom";

export default function PostList() {
    const { posts, getAllPosts } = useContext(PostContext);

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <>
            <div class="postCard">
                <div className="postHeader">
                    <div className="userPostHeaderDetails">
                        <div>
                            <h1>Approved Posts</h1>
                        </div>
                        <div>
                            <p>
                                <Link class="btn-red" to="/posts">Admin View</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="toggle">
                    <div>
                        <a href="/posts/add" className="approvedPosts">New Post</a>
                    </div>
                </div>
                <section className="authorPostCards">
                    {posts.map(p =>
                        <AuthorView key={p.id} post={p} />
                    )}
                </section>
            </div>
        </>
    )
}