import React, { useContext, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function PostForm() {
    const history = useHistory();
    const { addPost, getAllPosts } = useContext(PostContext);
    const [post, setPost] = useState({
        title: "",
        content: "",
        categoryId: 2
        // // imageLocation: "",
        // // dateCreated: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleFieldChange = e => {
        const stateToChange = { ...post };
        stateToChange[e.target.id] = e.target.value;
        setPost(stateToChange);
    };

    const createNewPost = e => {
        e.preventDefault();
        if (post.title === "") {
            alert("Give your post a title!")
        } else {
            setIsLoading(true);
        }

        addPost(post)
            .then(() => getAllPosts());

    };

    return (
        <>
            <Form>
                <FormGroup>
                    <div >
                        <Input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="title"
                            placeholder="Title"
                            value={post.title}
                        />
                        <Input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="imageLocation"
                            placeholder="Url"
                            value={post.imageLocation}
                        />
                        <Input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="content"
                            placeholder="Content"
                            value={post.content}
                        />
                        <Input
                            type="datetime-local"
                            required
                            onChange={handleFieldChange}
                            id="publicationDate"
                            placeholder="Publication Date"
                            value={post.publicationDate}
                        />
                        <div>
                            <Button
                                className="newPostSubmitButton"
                                type="submit"
                                disabled={isLoading}
                                onClick={createNewPost}
                            >Submit</Button>
                        </div>
                    </div>
                </FormGroup>
            </Form>
        </>
    )
}
