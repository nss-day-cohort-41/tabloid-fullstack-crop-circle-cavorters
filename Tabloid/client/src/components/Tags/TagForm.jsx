
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
import { useHistory } from "react-router-dom";


const TagForm = () => {
  const { addTag } = useContext(TagContext);
  //const [userProfileId, setUserProfileId] = useState("");
  const [name, setName] = useState("");


  // Use this hook to allow us to programatically redirect users
  const history = useHistory();


  const submit = (e) => {
    const tag = {
      name
    };



    addTag(tag).then((t) => {
      // Navigate the user back to the home route
      history.push("/");
    });
  };
//   export default function TagForm() {
//     const history = useHistory();
//     const { addTag } = useContext(TagContext);
//     const [tagName, setTagName] = useState();
  
    // const submitForm = (e) => {
    //   e.preventDefault();
    //   addTag({ name: tagName })
    //     .then(() => history.push("/"))
    //     //.catch((err) => alert(`An error ocurred: ${err.message}`));
    // };
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
              {/* <FormGroup>
                <Label for="userId">User Id (For Now...)</Label>
                <Input
                  id="userId"
                  onChange={(e) => setUserProfileId(e.target.value)}
                />
              </FormGroup> */}
              <FormGroup>
                <Label for="name">Name</Label>
                <Input id="name" onChange={(e) => setName(e.target.value)} />
              </FormGroup>
            </Form>
            <Button color="info" onClick={submit}>
              SUBMIT
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>

// <Form onSubmit={submitForm}>
// <FormGroup>
//   <Label for="Name">Tag</Label>
//   <Input id="Name" type="textarea" onChange={e => setTagName(e.target.value)} />
// </FormGroup>
// <FormGroup>
//   <Button>Save</Button>
// </FormGroup>
// </Form>
  );
};
 export default TagForm;
