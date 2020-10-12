import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";

export default function Category({ category }) {
    return (
        <Card className="m-4">
            <CardBody>
                <p>Category: {category.name}</p>
                <div className="categoryManagementButtons">
                    <Link to={`/categories/${category.id}`}><Button color="info">Edit</Button></Link>
                </div>
            </CardBody>

        </Card>
    );
}


// export default function Category({ category }) {
//     return (
//         <Card className="m-4">
//             <CardBody>
//                 <h2>{category.name}</h2>
//                 <p>{category.id}</p>
//             </CardBody>
//         </Card>
//     );
// }




// <h2>{category.name}</h2>
// <p>{category.id}</p>
// <div className="categoryManagementButtons">
//     <Link to={`/categories/${category.id}`}><Button color="info">Edit</Button></Link>