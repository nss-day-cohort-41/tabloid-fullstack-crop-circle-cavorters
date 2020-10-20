import React, { useContext, useState, useEffect } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export default function PostForm() {
    const history = useHistory();
    const { categories, getAllCategories } = useContext(CategoryContext);
    const { addPost } = useContext(PostContext);
    const [categoryId, setCategoryId] = useState();

    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

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

        } else if (post.categoryId === "" || post.categoryId === "default") {
            alert("Pick a Category!")

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
                        <br />
                        <Label for="imageLocation">Image URL</Label>
                        <Input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="imageLocation"
                            placeholder="Url"
                            value={post.imageLocation}
                        />
                        <Label for="category">Category</Label>
                        <Input
                            isOpen={dropdownOpen}
                            toggle={toggle}

                            required
                            type="select"
                            onChange={handleFieldChange}
                            id="categoryId"
                            value={post.category}
                        >
                            <DropdownToggle caret>
                                {/* Select Category */}
                            </DropdownToggle>
                            <option selected value="default" >Select a Category</option>
                            {categories.map(category => {

                                return <option key={category.id} value={category.id}>{category.name}</option>
                            })}

                        </Input>
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
                            <Link to={`/posts`}><Button type="button" color="warning">Cancel</Button></Link>
                        </div>
                    </div>
                </FormGroup>
            </Form>
        </>
    )
}
