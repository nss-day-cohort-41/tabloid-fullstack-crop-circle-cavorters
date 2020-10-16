import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
//import { useParamas } from "react-router-dom";


export default function PostTag({ PostTag }) {
    //const id = useParams();

    // console.log("postTagcaptureobject1", postTag)
    // console.log("postTagcaptureobject3", postTag.tag.name)

  return (

    <main className="tagCard">
      <section className="tagCardContainer"> 
        <div className="tagName">
          <div className="theTag">
            <strong>Tag: # </strong>
             
            "{PostTag.tag.name}"
          </div>
        </div>
        <div className="tagManagementButtons">   
          {/* <Link to={`/tags/${postTag.id}`}>
            <button className="tag-btn">Edit</button>
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link to={`/tags/delete/${postTag.id}`}>
            <button className="tag-btn">Delete</button>
          </Link> */}
        </div>
      </section>
    </main>
  );
}