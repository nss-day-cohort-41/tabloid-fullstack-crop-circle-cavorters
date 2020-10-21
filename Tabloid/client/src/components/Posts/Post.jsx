import React, { useContext } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Card, CardBody, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";



export default function Post({ post }) {
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const defaultImage = 'https://res.cloudinary.com/dhduglm4j/image/upload/v1602603540/tabloid_euehri.png';
  const { updatePost } = useContext(PostContext);
  const history = useHistory();


  const editedPost = {
    title: post.title,
    content: post.content,
    imageLocation: post.imageLocation,
    createDateTime: post.createDateTime,
    publishDateTime: post.publishDateTime,
    categoryId: post.categoryId,
    userProfileId: post.userProfileId,
    id: post.id,
    isApproved: post.isApproved
  };

  const approvePost = (e) => {
    console.log(editedPost)
    editedPost.isApproved = true;    
    updatePost(post.id, editedPost)
    .then(() => {
      history.go(`/posts/unapproved`);}
      )
  }


  if (sessionUser.userTypeId === 2 && post.userProfile.isActive === true) {
    return (
      <>
      <div className="authorPostItem">
        <div className="authorButtonsOverlay">
        <div className="imageButtonHeader">
          {!post.imageLocation ?
          <a className="defaultPostImagePreview" href={`/posts/details/${post.id}`}>
            <img className="defaultImageBackground" src={defaultImage} onerror="this.onerror=null;this.src=https://res.cloudinary.com/dhduglm4j/image/upload/v1602603540/tabloid_euehri.png;" alt="image" />
          </a>
          : <a className="postImagePreview" href={`/posts/details/${post.id}`}>
            <img className="imageBackground" src={post.imageLocation} alt="image"/>
          </a>
          }
          
          { sessionUser.id === post.userProfile.id 
          ?
          <div className="authorButtons">
            <Link className="authorBtn" style={{ textDecoration: 'none' }} to={`/posts/details/${post.id}`}>
              <img className="postAuthorBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121574/icons/eye_rimwzo.png" alt="details"/>
            </Link>
            <Link className="authorBtn" style={{ textDecoration: 'none' }} to={`/posts/edit/${post.id}`}>
              <img className="postAuthorBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121858/icons/edit_oeexa4.png"/>
            </Link>
            <Link className="authorBtn" style={{ textDecoration: 'none' }} to={`/posts/delete/${post.id}`}>
              <img className="postAuthorBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121902/icons/delete_mr2ko5.png" alt="delete"/>
            </Link> 
          </div> 
          : 
          null }
        </div>
        
        <div className="authorPostDetails">
          <div className="authorPostItems">
            <div className="authorPostHeaderLeft">
              <h5 className="apht">{post.title}</h5>
              <em className="postsAuthor">{post.userProfile.fullName} </em>
            </div>
            <div className="authorPostHeaderRight">
              <h5>{post.category.name}</h5>
              <i>{new Intl.DateTimeFormat('en-US').format(new Date(post.publishDateTime))}</i>
            </div> 
          </div>
        </div>
        </div>
      </div>
    </>
    );
  } 
  else if (sessionUser.userTypeId === 1) { 
    return (
      <> 
        <tbody className="postCard-details">
          <tr>
            <td className="postTitle">
              <strong>{post.title}</strong>
            </td>
            <td className="postUserName">
              <a href={`/users/${post.userProfile.firebaseUserId}`}>{post.userProfile.fullName}</a>
            </td>
            <td className="postCategory">
            {post.isApproved == true ?
              <p className="approved">Approved</p> : <p className="unapproved">Not Approved</p>}
            </td>
            <td className="postDate">
              {new Intl.DateTimeFormat('en-US').format(new Date(post.publishDateTime))}
            </td>
            { post.isApproved === true ?
            <div className="adminButtons">
              <Link className="adminBtn" style={{ textDecoration: 'none' }} to={`/posts/details/${post.id}`}>
                <img className="postAdminBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121574/icons/eye_rimwzo.png" alt="details"/>
              </Link>

              {/* return (
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
        </td>
      </tr>
    </tbody>

  ); */}



              <Link className="adminBtn" style={{ textDecoration: 'none' }} to={`/posts/edit/${post.id}`}>
                <img className="postAdminBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121858/icons/edit_oeexa4.png" alt="details"/>
              </Link>

              <Link className="adminBtn" style={{ textDecoration: 'none' }} to={`/posts/delete/${post.id}`}>
                <img className="postAdminBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121902/icons/delete_mr2ko5.png" alt="delete"/>
              </Link>
            </div> 
            : <div className="adminButtons">
                <button type="submit" onClick={e => {approvePost()}} className="unapprovedPosts">Approve</button>
              </div>
            }
          </tr>
        </tbody>
      </>    
    );
  }
  else {
    return null
  }
}