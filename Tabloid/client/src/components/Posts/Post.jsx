import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";


export default function Post({ post }) {
  return (
    <Card className="m-4">
      <CardBody>
        <h2>{post.title}</h2>
        <p>{post.userProfile.fullName}</p>
        <p>{post.categoryId}</p>
        <p>{post.isApproved}</p>
        <p>{post.publishDateTime}</p>
        <Link to={`/posts/comment/${post.id}`}><Button color="info">Comments</Button></Link>


      </CardBody>
    </Card>
  );
}
