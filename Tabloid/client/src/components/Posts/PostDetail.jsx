import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Card, CardBody, Button } from "reactstrap";
import { useParams, Link } from "react-router-dom";

export default function PostDetail() {
    const { post, getById } = useContext(PostContext);
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
            <Link to={`/posts`}><Button type="button" color="warning">Back to Posts</Button></Link>
            
            <Card className="m-4">
                <CardBody>
                    <h2>{post.title}</h2>
                    <p>{post.userProfile.displayName}</p>
                    <p>{post.imageLocation}</p>
                    <p>{post.categoryId}</p>

                    <p>{post.content}</p>
                    <p>Post was Published: {new Intl.DateTimeFormat('en-US').format(new Date(post.publishDateTime))}</p>
                </CardBody>
            </Card>
            


        </>
    )
}