import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Card, CardBody, Button } from "reactstrap";
import { useParams, Link } from "react-router-dom";

export default function PostDetail() {
    const { post, getById } = useContext(PostContext);
    console.log("post", post)
    const { id } = useParams();

    useEffect(() => {
        getById(id)

    }, []);

    // we need the if statement to return true on the first render.
    // so we must include !post.userProfile because react will not let us
    // ask for the property of an undefined object
    if (!post || !post.userProfile) {
        return null
    }
    return (

        <>
            <Link style={{ textDecoration: 'none' }} to={`/posts`}>
              <button className="std-btn">&#x2190; Back to Posts</button>
            </Link>
            <div className="postContainer">
                <div className="post">
                    <section className="px-3">
                        <div className="row justify-content-between">
                            <h1 className="text-secondary">{post.title}</h1>
                            <h1 className="text-black-50">{post.category.name}</h1>
                        </div>
                        <div className="row justify-content-between">
                            <p className="text-secondary">Written by {post.userProfile.displayName}</p>

                            <p className="text-black-50">Published on {new Intl.DateTimeFormat('en-US').format(new Date(post.publishDateTime))}</p>
                        </div>
                        <div className="row postBtns justify-content-between">
                            <Link to={`/posts`}><Button type="button" color="warning">Back to Posts</Button></Link>
                            <div>
                                <a href={`/posts/edit/${post.id}`} className="btn btn-outline-primary mx-1" title="Edit">
                                    <i className="fas fa-pencil-alt">Edit</i>
                                </a>
                                <a href={`/posts/delete/${post.id}`} className="btn btn-outline-primary mx-1" title="Delete">
                                    <i className="fas fa-trash">Delete</i>
                                </a>
                            </div>
                        </div>
                        <section className="row justify-content-center">
                            <div>
                                <img src={post.imageLocation} />
                            </div>
                        </section>
                    </section>
                    <hr />

                    <section className="row post__content">
                        <p className="col-sm-12 mt-5">{post.content}</p>
                    </section>

                    <a href={`/post/${post.id}/comments`}className="btn btn-outline-primary mx-1">View Comments</a>
                    
                </div>
            </div>
        </>
    )
}