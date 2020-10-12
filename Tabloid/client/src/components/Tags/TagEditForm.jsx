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
import { useHistory, useParams, Link } from "react-router-dom";
//import { useParams } from "react-router-dom";


const TagEditForm = () => {
  //Bringing in my fetch methods via UseContext
  const { getTagById, updateTag } = useContext(TagContext);
  //Creating a new object with state to update the exisiting DB's value with
  const [editedTag, setEditedTag] = useState("");
  const [tag, setTag] = useState("");
  //UseParams pulls in the id information from applications view 
  const { id } = useParams();
  // Use this hook to allow us to programatically redirect users
  const history = useHistory();


  //Setup found in Grace&Wisdom (new object and target values)...PreventDefault seems to break everything...might be needed later
  //https://stackoverflow.com/questions/30727837/react-change-input-defaultvalue-by-passing-props
  const editTag = (e) => {
    //e.preventDefault();
    updateTag({ name: editedTag.name, id: tag.id })
      .then(() => history.push("/tags"))
      .catch((err) => alert(`An error ocurred: ${err.message}`));
  }

  const handleFieldChange = evt => {
    //Pullin in props from the new object and targetting the name as the value to change
    const stateToChange = { ...editedTag };
    stateToChange[evt.target.name] = evt.target.value;
    setEditedTag(stateToChange);
  };

  //TESTING to see that useParams is pullin what I need...
  console.log(id);
  //console.log(idTag);


  //Getting the ID information and then setting my Tag
  useEffect(() => {
    getTagById(id)
      .then(setTag);
  }, []);


  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>

            <Form>
              <FormGroup>
                {/* USED FOR TESTING: <div>{tag.id}</div> */}
                <Input
                  id={tag.id}
                  onChange={handleFieldChange}
                  type="hidden"
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
            <Button type="button" color="success" onClick={e => { editTag() }}>Submit</Button>
            <Link to={`/tags`}><Button type="button" color="warning">Cancel</Button></Link>
          </CardBody>
        </Card>
      </div>
    </div>

  );
};
export default TagEditForm;