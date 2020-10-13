import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";

export default function Category({ category }) {
    return (
        <Card className="m-4">
            <CardBody>
                <p>Category: {category.name}</p>
                <div className="categoryManagementButtons">
                    <Link to={`/categories/${category.id}`}><Button>Edit</Button></Link> &nbsp;&nbsp;
                    <Link to={`/categories/delete/${category.id}`}><Button>Delete</Button></Link>
                </div>
            </CardBody>

        </Card>
    );
}
