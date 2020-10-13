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
          {post.category.name}
        </td>
        <td>
          {new Intl.DateTimeFormat('en-US').format(new Date(post.publishDateTime))}
        </td>
        <td>
          <Link style={{ textDecoration: 'none' }} to={`/posts/details/${post.id}`}>
            <button className="post-btn">View Post</button>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={`/posts/edit/${post.id}`}>
            <button className="post-btn">Edit</button>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={`/posts/delete/${post.id}`}>
            <button className="post-btn">Delete</button>
          </Link>
        </td>
      </tr>
    </tbody>

  );
}