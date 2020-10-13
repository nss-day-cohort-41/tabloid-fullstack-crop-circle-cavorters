import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CommentContext } from "../../providers/CommentProvider";
import { useParams } from "react-router-dom";

const CommentAddForm = () => {
    let userId = sessionStorage.userProfileId
    console.log(userId);
    const history = useHistory();
    const { id } = useParams();
    const { addComment } = useContext(CommentContext);
    const [commentText, setCommentText] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const [newComment, setNewComment] = useState({
        postId: parseInt(id),
        userProfileId: parseInt(userId),
        subject: "",
        content: ""
    })
    console.log(newComment);

    const submitForm = (e) => {
        e.preventDefault();
        addComment({ text: commentText })
            .then(() => history.push("/"))
            .catch((err) => alert(`Error has ocurred: ${err.message}`));
    };

    const handleFieldChange = (e) => {
        const stateToChange = { ...newComment };
        stateToChange[e.target.id] = e.target.value;
        setNewComment(stateToChange);
    };

    const addNewComment = () => {
        if (newComment.subject === "" || newComment.content === "") {
            alert("Subject and Content Required Fields");
        } else {
            setIsLoading(true);
            addComment(newComment);
            setIsLoading(false);
            history.push(`comments/${id}`)
        }
    }

    return (
        <Form>
            <h3> Add Comment </h3>
            <FormGroup>
                <Label htmlFor="subject"><strong>Subject</strong></Label>
                <Input className="p-2 bd-highlight justify-content-center"
                    value={newComment.subject}
                    onChange={handleFieldChange}
                    type="text"
                    name="subject"
                    id="subject"
                    required=""
                />
            </FormGroup>
            <>
                <Form onSubmit={submitForm}>
                    <FormGroup>
                        <Label for="commentText">Comment</Label>
                        <Input id="commentText" type="textarea" onChange={e => setCommentText(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Button>Save Comment</Button>
                    </FormGroup>
                </Form>
                <Button className="submitComment" type="button" color="success" isLoading={isLoading} onClick={addNewComment}>
                    {'Save Comment'}
                </Button>
            </>
        </Form>
    );
}

export default CommentAddForm;