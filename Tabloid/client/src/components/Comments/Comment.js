import React from "react";
import { Card, CardBody } from "reactstrap";

export default function Comment({ comment }) {
    return (
        <Card className="m-4">
            <CardBody>
                <h2>{comment.subject}</h2>
                <p>{comment.userProfile}</p>
                <p>{comment.content}</p>
                <p>{comment.postid}</p>
                <p>{comment.createDateTime}</p>
            </CardBody>
        </Card>
    );
}
