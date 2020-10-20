import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { PostTagContext } from "../../providers/PostTagProvider";
import { TagContext } from "../../providers/TagProvider";
import { Card, CardBody, Button, ListGroup } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import PostTag from "../Tags/PostTag";

export default function PostDetail() {
    const { post, getById } = useContext(PostContext);
    const { postTags, getAllTagsForAPost } = useContext(PostTagContext);
    const { id } = useParams();
    //const { tag, getTagById } = useContext(TagContext);

    useEffect(() => {
        getById(id)

    }, []);


    const parsedId = parseInt(id)

    useEffect(() => {
        getAllTagsForAPost(id);
    }, []);


    // if (!postTags) {
    //     return null;
    // }
    // we need the if statement to return true on the first render.
    // so we must include !post.userProfile because react will not let us
    // ask for the property of an undefined object
    if (!post || !post.userProfile) {
        return null
    }
    return (

        <>
            <div className="postContainer">
                <div className="post">
                    <section className="px-3">
                        <div className="row justify-content-between">
                            <div className="titleANDPostTag">
                                <h1 className="text-secondary">{post.title}</h1>
                            </div>
                            <h1 className="text-black-50">{post.category.name}</h1>
                        </div>
                        <div className="row justify-content-between">
                            {/* Start PostTag Route Management */}
                            <div className="postTagLineUp">
                                <a href={`/posttags/add/${post.id}`} className="btn btn-outline-primary mx-1"><img src="https://img.icons8.com/officel/20/000000/add-tag.png" alt="button-generic" /></a>
                                {/* <a href={`/posttags/delete/${post.id}`} className="btn btn-outline-primary mx-1"><img src="https://img.icons8.com/offices/20/000000/minus.png" alt="button-generic" /></a> */}
                                {postTags.map(pt => <PostTag key={pt.id} PostTag={pt} />)}
                            </div>
                            {/* End PostTag Route Management */}
                            <p className="text-black-50">Published on {new Intl.DateTimeFormat('en-US').format(new Date(post.publishDateTime))}</p>
                        </div>
                        <p className="text-secondary">Written by {post.userProfile.displayName}</p>
                        <div className="row postBtns justify-content-between">
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


                    {/* <a href={`/posts/details/${post.id}/posttags`} className="btn btn-outline-primary mx-1">View Tags</a> */}
                    <a href={`/post/${post.id}/comments`} className="btn btn-outline-primary mx-1">View Comments</a>
                </div>
            </div>
        </>
    )
}