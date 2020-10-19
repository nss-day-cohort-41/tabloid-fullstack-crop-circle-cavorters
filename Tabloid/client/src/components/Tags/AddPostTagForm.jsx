import React, { useState, useContext, useEffect } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
    DropdownToggle,
    DropdownMenu,

    DropdownItem

} from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import { PostTagContext } from "../../providers/PostTagProvider";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import PostTag from "./PostTag";



//Gifter was my source example on the process of post

const AddPostTagForm = () => {
    const { tags, getAllTags, addTag } = useContext(TagContext);
    const { postTags, setPostTags, addPostTag } = useContext(PostTagContext);
    const { post } = useContext(PostContext);
    const [createPostTag, setCreatePostTag] = useState("");
    const { id } = useParams();
    const parsedId = parseInt(id)
    // Use this hook to allow us to programatically redirect users
    const history = useHistory();



    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);







    const submit = (e) => {
        const createPostTag = { PostId: parseInt(id), TagId: ""};   
        addPostTag(createPostTag).then((post) => {
            history.push(`/posts/details/${parsedId}`);
        });
    };
    
    const handleFieldChange = e => {
        const stateToChange = { ...createPostTag };
        stateToChange[e.target.id] = e.target.value;
        setCreatePostTag(stateToChange);
    };

    useEffect(() => {
        getAllTags()
    }, []);

    
    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <Label for="tags">Tags</Label>
                            <Input isOpen={dropdownOpen} toggle={toggle}
                                required
                                type="select"
                                onChange={handleFieldChange}
                                id="createPostTag.TagId"
                                value={createPostTag.TagId}
                            >
                                <DropdownToggle caret>
                                    Select A Tag ta Add
                            </DropdownToggle>
                                <option>Select a Tag</option>
                                {tags.map(tag => {

                                    return <option key={tag.id} >{tag.name}</option>
                                })}

                            </Input>

                        </Form>
                        <Button color="success" onClick={submit}>
                            SUBMIT
            </Button>
                    </CardBody>
                </Card>
            </div>
        </div>

    );
};
export default AddPostTagForm;
