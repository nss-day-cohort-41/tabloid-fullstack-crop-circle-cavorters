import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { Button, } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import Comment from "./Comment";
//import Post from "./Post";
import { useHistory } from "react-router-dom";

export default function CommentList() {
    const { comments, getAllCommentsByPostId } = useContext(CommentContext);

    const { post, getPost } = useContext(PostContext)
    const { postId } = useParams();
    const { history } = useHistory();


    useEffect(() => {
        getAllCommentsByPostId(postId);
        //getPost(id);
    }, []);
    console.log("id", postId);



    return (
        <>
            <section>
                <div>
                    <h1>Comments</h1>
                    <Link to={`comments/add`}><Button color="primary">Add New Comment</Button></Link>
                </div>

                <h4>Subject</h4>
                <p>{comments && comments.subject}</p>

                <h6>Comment</h6>
                <p>{comments && comments.content}</p>

                <h6>Author</h6>
                <p>{comments && comments.userProfile}</p>

                <h6>Date</h6>
                <p>{comments && comments.createDateTime}</p>


                <Link to={`/posts`}><Button>
                    Back To Posts
            </Button></Link>
                {comments.map(c => {

                    return <Comment key={c.id} comment={c} />
                })}
            </section>




        </>
    );
};

