import React, { useContext, useState, useEffect } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { PostContext } from "../../providers/PostProvider";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function PostForm() {
    const history = useHistory();
    const { categories, getAllCategories } = useContext(CategoryContext);
    const { addPost } = useContext(PostContext);
    const [ categoryId, setCategoryId ] = useState();
    
    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const [post, setPost] = useState({
        title: "",
        content: "",
        categoryId: "",
        imageLocation: "",
        publishDateTime: "",
        isApproved: true,
        userProfileId: sessionUser.id
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

        const parsedCat = parseInt(categoryId);
        post.categoryId = parsedCat;
        addPost(post)
            .then((p) => {
                history.push(`/posts/details/${p.id}`)
            })

    };

    const handleChange = (e) => {
        setCategoryId(e.target.value);
      }

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <>
            <Form className="newPostForm">
                <FormGroup className="newPost">
                    <div >
                        <Label for="title">Title</Label>
                        <Input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="title"
                            placeholder="Title"
                            value={post.title}
                        />
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
                        <Label for="imageLocation">Image URL</Label>
                        <Input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="imageLocation"
                            placeholder="Url"
                            value={post.imageLocation}
                        />
                        <Label for="content">Content</Label>
                        <Input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="content"
                            placeholder="Content"
                            value={post.content}
                        />
                        <Label for="publishDateTime">Publish Date</Label>
                        <Input
                            type="datetime-local"
                            required
                            onChange={handleFieldChange}
                            id="publishDateTime"
                            placeholder="Publication Date"
                            value={post.publishDateTime}
                        />
                        <br />
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
