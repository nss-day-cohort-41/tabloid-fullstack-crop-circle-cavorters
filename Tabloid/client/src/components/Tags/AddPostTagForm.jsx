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
    const { postTag, setPostTag, addPostTag } = useContext(PostTagContext);
    const { post } = useContext(PostContext);
    //const [name, setName] = useState("");
    const { id } = useParams();
    const parsedId = parseInt(id)
    // Use this hook to allow us to programatically redirect users
    const history = useHistory();



    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const handleFieldChange = e => {
        const stateToChange = { ...postTag };
        stateToChange[e.target.id] = e.target.value;
        setPostTag(stateToChange);
    };



    const submit = (e) => {
        const PostTag = {
            PostId: parseInt(id),
            TagId: (id)

        };

        addPostTag(PostTag).then((t) => {

            history.push(`/posts/details/${post.id}`);
        });
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
                            {/* <FormGroup>
                                <Label for="name">Name</Label>
                                <Input id="name" onChange={(e) => setName(e.target.value)} />
                            </FormGroup> */}

                            <Label for="tags">Tags</Label>
                            <Input isOpen={dropdownOpen} toggle={toggle}

                                required
                                type="select"
                                onChange={handleFieldChange}
                                id="tagId"
                                value={PostTag.TagId}
                            >
                                <DropdownToggle caret>
                                    Select A Tag ta Add
                            </DropdownToggle>
                                <option selected value="default" >Select a Tag</option>
                                {tags.map(tag => {

                                    return <option key={tag.id} value={tag.id}>{tag.name}</option>
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
