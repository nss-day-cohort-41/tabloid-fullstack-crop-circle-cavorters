import React, { useContext, useEffect } from "react";
import Comment from "./Comment";
import { CommentContext } from "../../providers/CommentProvider";


export default function CommentList() {
    const { comments, getAllPostComments } = useContext(CommentContext);

    useEffect(() => {
        getAllPostComments();
    }, []);

    return (
        <section>
            {comments.map(c =>
                <Post key={c.id} comment={c} />
            )}
        </section>
    );
}