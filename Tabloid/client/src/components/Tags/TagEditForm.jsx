
import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button,
} from "reactstrap";
import Tag from "./Tag";
import { TagContext } from "../../providers/TagProvider";
import { useHistory, useParams } from "react-router-dom";
//import { useParamas } from "react-router-dom";


const TagForm = () => {
  const { getTagById, updateTag } = useContext(TagContext);
  const [editedTag, setEditedTag] = useState("");
  const [tag, setTag] = useState("");
 //UseParams pulls in the id information from applications view 
  const { id } = useParams();
// Use this hook to allow us to programatically redirect users
  const history = useHistory();


//Setup found in Grace&Wisdom (new object and target values)...PreventDefault seems to break everything...might be needed later
  const editTag = (e) => {
    //e.preventDefault();
    updateTag({ name: editedTag.name, id: tag.id})
      .then(() => history.push("/tags"))
      .catch((err) => alert(`An error ocurred: ${err.message}`));
  }

  const handleFieldChange = evt => {
    const stateToChange = { ...editedTag };
    stateToChange[evt.target.name] = evt.target.value;
    setEditedTag(stateToChange);
};

//const id = useParams();


//   const submit = (e) => {
//     const tag = {
//       name
//     };

    // const submit = evt => {

    //     const tag = {
    //         name
    //     };
    //     updateTag(tag).then((t) => {
    //         // Navigate the user back to the home route
    //         history.push("/");
  
    //  })} }
console.log(id);
//console.log(idTag);


  useEffect(() => {
    getTagById(id)
    .then(setTag);
    
}, []);

//     updateTag(editedTag).then((t) => {
//       // Navigate the user back to the home route
//       history.push("/");
//     });
//   };
  // const submitForm = (e) => {
  //   e.preventDefault();
  //   addQuote({ text: quoteText })
  //     .then(() => history.push("/"))
  //     .catch((err) => alert(`An error ocurred: ${err.message}`));
  // };

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
  
            <Form>
              <FormGroup>
                {/*
                USED FOR TESTING: <div>{tag.id}</div> 
                */}
                <Input
                  id= {tag.id}
                  onChange={handleFieldChange}
                  type= "hidden"
                  value={tag.id}
                />
              </FormGroup>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input 
                type="textarea" 
                id="name"  
                required
                defaultValue={tag.name}
                name="name"
                //onChange={(e) => setTag(e.target.value)}
               onChange={handleFieldChange}
                />
              </FormGroup>
            </Form>
            <Button  type="button" onClick={e => {editTag()}}>Submit</Button>
          </CardBody>
        </Card>
      </div>
    </div>

  );
 };
 export default TagForm;