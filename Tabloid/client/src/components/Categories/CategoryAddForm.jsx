import React, { useState, useContext, useEffect } from "react";
import { Form, FormGroup, Card, CardBody, Label, Input, Button, } from "reactstrap";
import Category from "./Category";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory } from "react-router-dom";


const CategoryAddForm = () => {
    const { addCategory } = useContext(CategoryContext);
    const [name, setName] = useState("");
    const history = useHistory();

    const submit = (e) => {
        const category = {
            name
        };


        addCategory(category).then((t) => {
            history.push("/");
        });
    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            {}
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
    );
};

export default CategoryAddForm;























// import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom";
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import { CategoryContext } from "../providers/CategoryProvider";

// export default function CategoryAddForm() {
//     const history = useHistory();
//     const { addCategory } = useContext(CategoryContext);
//     const [categoryText, setCategoryText] = useState();

//     const submitForm = (e) => {
//         e.preventDefault();
//         addCategory({ text: categoryText })
//             .then(() => history.push("/"))
//             .catch((err) => alert(`An error ocurred: ${err.message}`));
//     };

//     return (
//         <Form onSubmit={submitForm}>
//             <FormGroup>
//                 <Label for="categoryText">Category</Label>
//                 <Input id="categoryText" type="textarea" onChange={e => setCategoryText(e.target.value)} />
//             </FormGroup>
//             <FormGroup>
//                 <Button>Save</Button>
//             </FormGroup>
//         </Form>
//     );
// }