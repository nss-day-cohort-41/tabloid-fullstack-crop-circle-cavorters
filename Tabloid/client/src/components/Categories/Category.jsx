import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";

export default function Category({ category }) {
  return (
    <main className="tagCard">
      <section className="tagCardContainer">
        <div className="tagName">
          <div className="theTag">
            <strong>Category: </strong>{category.name}
          </div>
        </div>
        <div className="tagManagementButtons">
          <Link to={`/categories/${category.id}`}>
            <button className="tag-btn">Edit</button>
          </Link>
            &nbsp;&nbsp;&nbsp;
            <Link to={`/categories/delete/${category.id}`}>
            <button className="tag-btn">Delete</button>
          </Link>
        </div>
      </section>
    </main>
  );
}
