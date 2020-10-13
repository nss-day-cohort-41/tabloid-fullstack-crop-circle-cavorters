import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";


export const CommentContext = createContext();

export function CommentProvider(props) {
    const apiUrl = "/api/post/comment";
    const { getToken } = useContext(UserProfileContext);

    const [comments, setComments] = useState([]);

    //Get all Comments by id,must match API
    const getAllCommentsByPostId = (id) =>
        getToken().then((token) =>
            fetch(apiUrl + "/" + id, {
                //fetch(/api/post/${id}/comment, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setComments)); 
                
              //Add a new comment  
                const addComment = (newComment) => {
                    return getToken().then((token) => {
                        fetch("/api/comment/", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            },
                            body: JSON.stringify(newComment)
                        })
                    })
                };

    const editComment = (comment) => {
        return getToken().then((token) => {
            fetch(`/api/comment/${comment.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(comment)
            })
        })
    }

    const deleteComment = (commentId) => {
        return getToken().then((token) => {
            fetch(`/api/comment/${commentId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
    }

    return (

        <CommentContext.Provider value={{ comments, getAllCommentsByPostId, addComment, editComment, deleteComment }}>
            {props.children}
        </CommentContext.Provider>
    );
}