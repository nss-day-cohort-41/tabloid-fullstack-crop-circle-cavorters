import React from "react";
import { Card, CardBody } from "reactstrap";

export default function Post({ post }) {
  return (
    <Card className="m-4">
      <CardBody>
          <h2>{post.title}</h2>
          <p>{post.userProfile.fullName}</p>
          <p>{post.categoryId}</p>
          <p>{post.isApproved}</p>
          <p>{post.publishDateTime}</p>
      </CardBody>
    </Card>
  );
}