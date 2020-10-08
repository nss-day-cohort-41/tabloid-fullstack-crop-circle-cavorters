import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Card, CardBody } from "reactstrap";
import { useParams } from "react-router-dom";

export default function PostDetail() {
    const { post, getById } = useContext(PostContext);
    const { id } = useParams();
    console.log("post:", post, "id:", id);

    useEffect(() => {
        getById(id)
            ;
    }, []);

    if (!post) {
        return null
    }
    return (
        <Card className="m-4">
            <CardBody>
                <h2>{post.title}</h2>
                {/* <p>{post.userProfile.displayName}</p> */}
                <p>{post.imageLocation}</p>
                <p>{post.categoryId}</p>
                <p>{post.isApproved}</p>
                <p>{post.content}</p>
                <p>{post.publishDateTime}</p>
            </CardBody>
        </Card>
    )
}