import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams, Link } from "react-router-dom";


const CommentList = () => {
    const { comments, getAllComments } = useContext(CommentContext);
    const { id } = useParams();

    useEffect(() => {
        getAllComments(id);
    }, []);

    console.log(id);

    return (
        <div>
            <h1>Comments</h1>

            {comments.map((comment) => (

                <div key={comment.postId} >

                    <ListGroup>
                        <ListGroupItem>
                            <p>{comment.subject}</p>
                            <p>{comment.content}</p>
                            <p>{comment.userProfileId}</p>
                            <p>{comment.createDateTime}</p>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            ))}

            <Link to={`/post/`}>Return to Posts</Link>
        </div>
    );

};

export default CommentList;