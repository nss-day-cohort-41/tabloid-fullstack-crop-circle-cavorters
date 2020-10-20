import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
//import { useParamas } from "react-router-dom";


export default function PostTag({ PostTag }) {
    //const id = useParams();

    // console.log("postTagcaptureobject1", postTag)
    // console.log("postTagcaptureobject3", postTag.tag.name)

  return (

    <main className="postTagCard">
      <section className="postTagCardContainer"> 
        <div className="postTagName">
         <h5 className="theHashTagtoSetOtherstoShame"> # </h5>
             "{PostTag.tag.name}"
        </div>
       {/* <div className="postTagManagementButtons">   
            <Link to={`/tags/${PostTag.id}`}>
            <button className="tag-btn">Edit</button>
          </Link> */}
          &nbsp;&nbsp;&nbsp;
          {/* <Link to={`/tags/delete/${PostTag.id}`}>
            <button className="tag-btn">Delete</button>
          </Link> 
        </div> */}
      </section>
    </main>
  );
}