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

} from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import { PostTagContext } from "../../providers/PostTagProvider";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, useParams, Link } from "react-router-dom";
//import PostTag from "./PostTag";



//Gifter was my source example on the process of post

const AddPostTagForm = () => {
    const { tags, getAllTags, addTag } = useContext(TagContext);
    const { postTags, setPostTags, addPostTag } = useContext(PostTagContext);
    const { post } = useContext(PostContext);
    const { id } = useParams();
    const parsedId = parseInt(id)
    const [createPostTag, setCreatePostTag] = useState();
    // Use this hook to allow us to programatically redirect users
    const history = useHistory();
 const [postTag, setPostTag] = useState({postId: parseInt(id), tagId: createPostTag});


    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);


    const submit = (e) => {
        e.preventDefault(); 
        const parsedTagId = parseInt(createPostTag)
        postTag.tagId = parsedTagId; 
       // console.log("posttag=", postTag)   
        addPostTag(postTag).then(() => {
            history.push(`/posts/details/${parsedId}`);
        });
    };

//Mistake Made 101: make sure your forms target "value" is not "key"...othewise the value will not be recorded
    const handleFieldChange = (e) => {
        setCreatePostTag(e.target.value);
      }

  //    console.log("createdposttag=", createPostTag)

    useEffect(() => {
        getAllTags()
    }, []);


    // if (!postTag) {
    //     return null;
    //   } 
    
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
                               // value= {postTag.tagId}
                                // value={createPostTag.tagId}
                            >
                                <DropdownToggle caret>
                                    Select A Tag ta Add
                            </DropdownToggle>
                                <option>Select a Tag</option>
                                {tags.map(tag => {
                                    return <option value={tag.id} >{tag.name}</option>
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
