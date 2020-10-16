//Providers are like the front-end Repositories. This is where you will find your ingredients to pull from.

import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CommentContext = createContext();

export function CommentProvider(props) {
    const apiUrl = "/api/comment";
    const { getToken } = useContext(UserProfileContext);

    const [comments, setComments] = useState([]);

    //List all the Action Methods in Code Blocks Below
    //Get all Comments by id,must match API. Makes fetch calls to the API.
    const getAllCommentsByPostId = (id) =>
        getToken().then((token) =>
            fetch(apiUrl + "/" + id, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setComments));



    //Add A New Comment

    // const addComment = (comment) =>
    //     getToken().then((token) =>
    //         fetch(apiUrl, {
    //             method: "POST",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(comment)
    //         }).then(resp => {
    //             if (resp.ok) {
    //                 return resp.json();
    //             }
    //             throw new Error("Unauthorized");
    //         }));


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

    ///Must return your catalog of actions
    return (

        <CommentContext.Provider value={{ comments, getAllCommentsByPostId, addComment, editComment, deleteComment }}>
            {props.children}
        </CommentContext.Provider>
    );
}