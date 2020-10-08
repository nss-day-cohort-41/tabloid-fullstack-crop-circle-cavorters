import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Card, CardBody } from "reactstrap";


export default function PostDetail() {
    const { post, getById } = useContext(PostContext);

    useEffect(() => {
        getById();
    }, []);

    return (
        <Card className="m-4">
            <CardBody>
                <h2>{post.title}</h2>
                <p>{post.userProfile.fullName}</p>
                <p>{post.imageLocation}</p>
                <p>{post.categoryId}</p>
                <p>{post.isApproved}</p>
                <p>{post.content}</p>
                <p>{post.publishDateTime}</p>
            </CardBody>
        </Card>
    )
}