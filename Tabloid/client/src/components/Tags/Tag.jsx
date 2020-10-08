import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
//import { useParamas } from "react-router-dom";


export default function Tag({ tag }) {
    //const id = useParams();
  return (
    <Card className="m-4">
      <CardBody>    
          <p><strong>Tag Name: </strong>{tag.name}</p>
      </CardBody>
      <Link to={`/tags/${tag.id}`}><Button color="info">Edit Tag</Button></Link>
    </Card>
  );
}