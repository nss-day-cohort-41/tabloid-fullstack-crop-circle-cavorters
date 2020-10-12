import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

export default function Post({ post }) {


  return (
    <tbody>
      <tr>
        <td>
          {post.title}
        </td>
        <td>
          {post.userProfile.fullName}
        </td>
        <td>
          {post.categoryId}
        </td>
        <td>
          {post.publishDateTime}
        </td>
        <td>
          <Link style={{ textDecoration: 'none' }} to={`/posts/details/${post.id}`}>
            <button className="std-btn">View Post</button>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={`/posts/edit/${post.id}`}>
            <button className="std-btn">Edit</button>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={`/posts/delete/${post.id}`}>
            <button className="std-btn">Delete</button>
          </Link>
        </td>
      </tr>
    </tbody>

  );
}