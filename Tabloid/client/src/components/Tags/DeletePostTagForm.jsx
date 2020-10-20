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
import PostTag from "./PostTag";



//Gifter was my source example on the process of post

const DeletePostTagForm = () => {
    const { tags, getAllTags } = useContext(TagContext);
    const { postTagz, deletePostTag, getPostTagById, getAllTagsForAPost } = useContext(PostTagContext);
    const { post, getById } = useContext(PostContext);
    const { id } = useParams();
    const parsedId = parseInt(id)
    //const [createPostTag, setCreatePostTag] = useState();
    // Use this hook to allow us to programatically redirect users
    const history = useHistory();
 const [postTag, setPostTags] = useState("");


    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);





    console.log(id)
    console.log("yeet2afterdelete", postTagz.Id)
//Mistake Made 101: make sure your forms target "value" is not "key"...othewise the value will not be recorded
    const handleFieldChange = (e) => {
        setPostTags(e.target.value);
      }

  //    console.log("createdposttag=", createPostTag)
  useEffect(() => {
    //getAllTags() 
    //getById(id)
    getAllTagsForAPost(id)   
}, []);



const deletePostTagz = (e) => {
    e.preventDefault(); 
    deletePostTag(postTag.id).then(() => {
        history.push(`/posts/details/${parsedId}`);
    }); 

};

    useEffect(() => {
        getPostTagById(id) 
        .then((postTagz) => {
            setPostTags(postTagz)         
        })
    }, []);



    if (!postTagz) {
        return null;
      } 
      
      console.log("what2", postTagz.id)
      console.log("yeet1beforedelete", postTagz)
      console.log("yeet1beforedeleteID", postTagz.TagId)   

    return (

        <>
        <main className="tagzDeleteContainer">
            <section className="users-table">
                <h4>....So you wanna delete your tag : ""?</h4>
                <hr />
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
                                    Select A Tag ta Delete
                            </DropdownToggle>
                                <option>Select a Tag</option>
                                {postTagz.map(pt => {
                                    return <option value={pt.id} PostTag={pt} >{pt.tag.name}</option>
                                })}

                            </Input>

                        </Form>
                        <Button color="success" onClick={deletePostTagz}>
                           DELETE
            </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
        </section>
      </main>
</>
    );
};
export default DeletePostTagForm;
