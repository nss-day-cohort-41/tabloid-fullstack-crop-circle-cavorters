
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
  const [tag, setTag] = useState("");
  const { id } = useParams();
 const [name, setName] = useState("");


  // Use this hook to allow us to programatically redirect users
  const history = useHistory();

  const editTag = (e) => {
    e.preventDefault();
    updateTag(tag)
        .then(() => history.push("/tags"));
  }

//   const handleFieldChange = evt => {
//     const stateToChange = { ...tag };
//     stateToChange[evt.target.id] = evt.target.value;
//     setTag(stateToChange);
// };

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
console.log(id)

  useEffect(() => {
    getTagById(id)
    .then(tag=>{setTag(tag)});
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
                <div>{tag.name}</div>
                <Input
                  id= {tag.id}
                 //onChange={handleFieldChange}
                //onChange={(e) => setTag(e.target.value)}
                  type= "hidden"
                  value={tag.id}

                />
              </FormGroup>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input id="name"  
                value={tag.name} 
               onChange={(e) => setName(e.target.value)} 
               // onChange={handleFieldChange}
                />
              </FormGroup>
            </Form>
            <Button color="info" onClick={editTag}>
              SUBMIT
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>

  );
 };
 export default TagForm;