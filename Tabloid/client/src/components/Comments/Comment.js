import React from "react";
import { Card, CardBody } from "reactstrap";
import { currentDateTime } from "./helperFunctions";
import { Card, CardBody, Button } from "reactstrap";

const Comment = ({ comment }) => {
    let userId = sessionStorage.userProfileId
    const history = useHistory();
    return (
        <Card className="m-4">
            <p className="text-left px-2">
                {currentDateTime(comment.createDateTime)}</p>
            <CardBody>
                <h2>Subject</h2>
                <h2>{comment.subject}</h2>
                <p>{comment.userProfile}</p>

                <h2>Comment</h2>
                <p>{comment.content}</p>

            </CardBody>
            {comment.userProfileId !== parseInt(userId) ? null :

                <>
                    <Button onClick={() => history.push(`/comments/edit/${comment.id}`)}>Edit </Button>
                    <Button onClick={() => history.push(`/comments/delete/${comment.id}`)}>Delete</Button>
                </>
            }
        </Card>
    );
}

export default Comment;
