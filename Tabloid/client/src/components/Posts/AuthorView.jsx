import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";



export default function Post({ post }) {
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const defaultImage = 'https://res.cloudinary.com/dhduglm4j/image/upload/v1602603540/tabloid_euehri.png'

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