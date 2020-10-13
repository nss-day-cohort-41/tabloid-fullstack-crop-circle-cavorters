import React, { useState, useContext, useEffect } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button } from "reactstrap";
import Category from "./Category";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory, useParams, Link } from "react-router-dom";


const CategoryEditForm = () => {

    const { getCategoryById, updateCategory } = useContext(CategoryContext);
    const [editedCategory, setEditedCategory] = useState("");
    const [category, setCategory] = useState("");
    const { id } = useParams();
    const history = useHistory();


    //Setup found in Grace&Wisdom (new object and target values)
    const editCategory = (e) => {
        updateCategory({ name: editedCategory.name, id: category.id })
            .then(() => history.push("/categories"))
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    }

    const handleFieldChange = evt => {
        const stateToChange = { ...editedCategory };
        stateToChange[evt.target.name] = evt.target.value;
        setEditedCategory(stateToChange);
    };

    //This is a test.
    console.log(id);

    useEffect(() => {
        getCategoryById(id)
            .then(setCategory);
    }, []);


    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>

                        <Form>
                            <FormGroup>
                                <Input
                                    id={category.id}
                                    onChange={handleFieldChange}
                                    type="hidden"
                                    value={category.id}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="textarea"
                                    id="name"
                                    required
                                    defaultValue={category.name}
                                    name="name"
                                    onChange={handleFieldChange}
                                />
                            </FormGroup>
                        </Form>
                        <Button type="button" onClick={e => { editCategory() }}>Submit</Button>
                        <Link to={`/categories`}><Button type="button">Cancel</Button></Link>
                    </CardBody>
                </Card>
            </div>
        </div>

    );
};
export default CategoryEditForm; 