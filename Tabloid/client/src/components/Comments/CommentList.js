import React, { useContext, useEffect } from "react";
import Comment from "./Comment";
import { CommentContext } from "../../providers/CommentProvider";


export default function CommentList() {
    const { comments, refreshComments } = useContext(CommentContext);

    useEffect(() => {
        refreshComments();
    }, []);

    return (
        <section>
            {comments.map(q =>
                <Comment key={q.id} Comment={q} />
            )}
        </section>
    );
}