import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
//import { useParamas } from "react-router-dom";


export default function Tag({ tag }) {
    //const id = useParams();
  return (
    <main className="tagCard">
      <section className="tagCardContainer"> 
        <div className="tagName">
          <div className="theTag">
            <strong>Tag Name: </strong>{tag.name}
          </div>
        </div>
        <div className="tagManagementButtons">   
          <Link to={`/tags/${tag.id}`}>
            <button className="tag-btn">Edit</button>
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link to={`/tags/delete/${tag.id}`}>
            <button className="tag-btn">Delete</button>
          </Link>
        </div>
      </section>
    </main>
  );
}