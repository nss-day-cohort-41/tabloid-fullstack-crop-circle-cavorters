import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { Button, } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import Comment from "./Comment";


export default function CommentList() {
    const { comments, getAllCommentsByPostId } = useContext(CommentContext);
    //const { post, getById} = useContext(PostContext)
    const { id } = useParams();

    useEffect(() => {
        getAllCommentsByPostId(id);
    }, []);

    console.log(id);

    return (
        <>
            <section>
                <div>
                    <h1>Comments</h1>
                    <Link to={`/comments/add`}><Button color="primary">Add New Comment</Button></Link>
                </div>
                {comments.map(c =>
                    <Comment key={c.id} comment={c} />
                )}

            </section>
        </>
    );
};

