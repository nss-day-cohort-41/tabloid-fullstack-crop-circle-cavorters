import React from "react";
import { Card, CardBody } from "reactstrap";

export default function Tag({ tag }) {
  return (
    <Card className="m-4">
      <CardBody>
          <h2>Tag Name:</h2>
          <p>{tag.name}</p>
      </CardBody>
    </Card>
  );
}