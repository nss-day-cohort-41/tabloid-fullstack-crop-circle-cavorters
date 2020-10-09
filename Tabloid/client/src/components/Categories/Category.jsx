import React from "react";
import { Card, CardBody } from "reactstrap";

export default function Category({ category }) {
    return (
        <Card className="m-4">
            <CardBody>
                <h2>{category.name}</h2>
                <p>{category.id}</p>
            </CardBody>
        </Card>
    );
}
