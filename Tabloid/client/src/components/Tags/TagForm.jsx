
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
import { TagContext } from "../../providers/TagProvider";
import { useHistory } from "react-router-dom";

//Gifter was my source example on the process of post

const TagForm = () => {
  const { addTag } = useContext(TagContext);
  const [name, setName] = useState("");


  // Use this hook to allow us to programatically redirect users
  const history = useHistory();


  const submit = (e) => {
    const tag = {
      name
    };



    addTag(tag).then((t) => {
      // Navigate the user back to the home route
      history.push("/tags");
    });
  };

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input id="name" onChange={(e) => setName(e.target.value)} />
              </FormGroup>
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
 export default TagForm;
