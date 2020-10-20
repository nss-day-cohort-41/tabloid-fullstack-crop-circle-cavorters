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

          <Link to={`/post/${post.id}/comments`}><Button color="info">Comments</Button></Link>

          <Link style={{ textDecoration: 'none' }} to={`/posts/edit/${post.id}`}>
            <button className="post-btn">Edit</button>
          </Link>
          <Link style={{ textDecoration: 'none' }} to={`/posts/delete/${post.id}`}>
            <button className="post-btn">Delete</button>
          </Link>


          {/* <td>
            {reaction.postid}
          </td> */}
        </td>
      </tr>
    </tbody>

  );
}


// export function Reaction({ reaction }) {
//   <tbody>
//     <td>
//       {reaction.Id}
//     </td>

//     <td>
//       {reaction.PostId}
//     </td>

//     <td>
//       {reaction.ReactionId}
//     </td>

//     <td>
//       {reaction.UserProfileId}
//     </td>
//   </tbody>
// }