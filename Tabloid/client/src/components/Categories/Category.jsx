import React from "react";
import { Card, CardBody } from "reactstrap";

export default function Category({ category }) {
    return (
        <Card className="m-4">
            <CardBody>
                <h2>{category.Name}</h2>
                <p>{category.Id}</p>
            </CardBody>
        </Card>
    );
}
