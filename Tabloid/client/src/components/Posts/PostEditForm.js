import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Card, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function PostEditForm() {

    const { getById, updatePost, post, } = useContext(PostContext);
    const [editedPost, setEditedPost] = useState({});

    //UseParams pulls in the id information from applications view 
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getById(parseInt(id));
    }, [])

    useEffect(() => {
        setEditedPost(post)
    }, [post]);

    const editPost = (e) => {

        updatePost({
            title: editedPost.title,
            content: editedPost.content,
            category: editedPost.category,
            headerImageUrl: editedPost.imageLocation,
            publicationDate: editedPost.publishDateTime,
            id: post.id
        })

        updatePost(editedPost.id, editedPost);
        history.push(`/posts/details/${id}`);
    }

    const handleFieldChange = e => {
        const stateToChange = { ...editedPost };
        stateToChange[e.target.id] = e.target.value;
        setEditedPost(stateToChange);
    };

    if (!editedPost) {
        return null
    }
    return (
        <>
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <Card className="col-sm-12 col-lg-6">
                        <CardBody>

                            <Form>
                                <FormGroup>

                                    <Input
                                        id={editedPost.id}
                                        onChange={handleFieldChange}
                                        type="hidden"
                                        value={post.id}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="content">Title</Label>
                                    <Input
                                        type="text"
                                        id="title"
                                        required
                                        defaultValue={editedPost.title}
                                        name="content"
                                        onChange={handleFieldChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="content">Content</Label>
                                    <Input
                                        type="textarea"
                                        id="content"
                                        required
                                        defaultValue={editedPost.content}
                                        name="content"
                                        onChange={handleFieldChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="content">Category</Label>
                                    <Input
                                        type="select"
                                        id="category"
                                        required
                                        defaultValue={editedPost.category}
                                        name="category"
                                        onChange={handleFieldChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="content">Image Location</Label>
                                    <Input
                                        type="text"
                                        id="imageLocation"
                                        required
                                        defaultValue={editedPost.imageLocation}
                                        name="imageLocation"
                                        onChange={handleFieldChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="content">Image Location</Label>
                                    <Input
                                        type="datetime-local"
                                        id="publishDateTime"
                                        required
                                        defaultValue={editedPost.publishDateTime}
                                        name="publishDateTime"
                                        onChange={handleFieldChange}
                                    />
                                </FormGroup>
                            </Form>
                            <Button type="button" color="success" onClick={e => { editPost() }}>Save</Button>
                            <Link to={`/posts`}><Button type="button" color="warning">Cancel</Button></Link>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}