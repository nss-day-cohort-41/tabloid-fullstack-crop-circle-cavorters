import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { Button, } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import Comment from "./Comment";


export default function CommentList() {
    const { comments, getAllCommentsByPostId } = useContext(CommentContext);
    //const { post, getPost } = useContext(PostContext)
    const { id } = useParams();

    useEffect(() => {
        getAllCommentsByPostId(id);
        //getPost(id);
    }, []);



    return (
        <>
            <section>
                <div>
                    <h1>Comments</h1>
                    <Link to={`comments/add`}><Button color="primary">Add New Comment</Button></Link>
                </div>
                {/* {comments && comments.map((comment) => {
                    return (
                        <Comment key={comment.id} comment={comment} />
                    )
                }

                )} */}

            </section>
        </>
    );
};

