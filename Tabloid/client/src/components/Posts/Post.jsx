import React from "react";
import { Card, CardBody, Button } from "reactstrap";

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
        <Button
          onClick={viewDetails}>View Post</Button>

      </CardBody>
    </Card>
  );
}
