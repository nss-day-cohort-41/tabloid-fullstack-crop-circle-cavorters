import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  let id = post.id;
  const viewDetails = () => {
    alert("DETAILS!!!!", id);
  }

  return (
    <Card className="m-4">
      <CardBody>
        <h2>{post.title}</h2>
        <p>{post.userProfile.fullName}</p>
        <p>{post.categoryId}</p>
        <p>{post.isApproved}</p>
        <p>{post.publishDateTime}</p>
        <Link
          to={`/posts/details/${post.id}`}>View Post</Link>

      </CardBody>
    </Card>
  );
}
