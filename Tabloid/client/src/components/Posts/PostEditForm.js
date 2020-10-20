import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Card, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function PostEditForm() {

    const { getById, updatePost, post } = useContext(PostContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const [ categoryId, setCategoryId ] = useState();
    
    const [editedPost, setEditedPost] = useState({
        title: "",
        content: "",
        imageLocation: "",
        publishDateTime: "",
        categoryId: "",
        userProfileId: post.userProfileId,
        id: post.id,
        isApproved: post.isApproved
    });


    //UseParams pulls in the id information from applications view 
    const { id } = useParams();
    const history = useHistory();

    const handleChange = (e) => {
        setCategoryId(e.target.value);
      }

    useEffect(() => {
        getById(parseInt(id));
    }, [])

    useEffect(() => {
        getAllCategories();
    }, [])


    useEffect(() => {
        setEditedPost(post)
    }, [post]);

    const editPost = (e) => {
        updatePost({
            title: editedPost.title,
            content: editedPost.content,
            imageLocation: editedPost.imageLocation,
            publicationDate: editedPost.publishDateTime,
            id: post.id
        })

        const parsedCat = parseInt(categoryId);
        editedPost.categoryId = parsedCat;

        if (!editedPost.categoryId) {
            editedPost.categoryId = post.categoryId;
        }

        updatePost(editedPost.id, editedPost)
        .then(() => {
        history.push(`/posts/details/${id}`);}
        )}

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
                                    <Input
                                        id={editedPost.isApproved}
                                        onChange={handleFieldChange}
                                        type="hidden"
                                        value={post.isApproved}
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
                                    <Label for="category">Category</Label>
                                    <br />
                                    <select className="userEditDropdown" onChange={handleChange}> 
                                    {categories.map(category =>
                                        category.id === post.categoryId ?
                                        <option selected value={category.id}>
                                            {category.name}
                                        </option> :    
                                        <option value={category.id}>
                                            {category.name}
                                        </option>            
                                    )}
                                    </select>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="imageLocation">Image Location</Label>
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
                                    <Label for="publishDate">Publish Date</Label>
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
                            <Button type="button" color="success" onClick={e => { editPost() }}>Save</Button> &nbsp;&nbsp;
                            <Link to={`/posts`}><Button type="button" color="warning">Cancel</Button></Link>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}