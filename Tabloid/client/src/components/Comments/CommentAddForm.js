import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CommentContext } from "../../providers/CommentProvider";

export default function CommentAddForm() {
    const history = useHistory();
    const { addComment } = useContext(CommentContext);
    const [commentText, setCommentText] = useState();

    const submitForm = (e) => {
        e.preventDefault();
        addComment({ text: commentText })
            .then(() => history.push("/"))
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="commentText">Comment</Label>
                <Input id="commentText" type="textarea" onChange={e => setCommentText(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Button>Save</Button>
            </FormGroup>
        </Form>
    );
}