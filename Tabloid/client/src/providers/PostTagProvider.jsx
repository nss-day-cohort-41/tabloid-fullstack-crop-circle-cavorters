import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostTagContext = React.createContext();

export const PostTagProvider = (props) => {
    const apiUrl = "/api/posttag";
    const { getToken } = useContext(UserProfileContext);
    const [postTags, setPostTags] = useState([]);
    const [postTag, setPostTag] = useState([]);
    const [postTagz, setPostTagz] = useState([]);



    const getAllTagsForAPost = (id) =>
        getToken().then((token) =>
            //fetch(`/api/${postId}/posttag`, {
            fetch(`${apiUrl}/GetPT/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()))
            .then(setPostTags);

    const getPostTagById = (id) =>
        getToken().then((token) =>
            fetch(`/api/posttag/GetSinglePT/${id}`, {
                // fetch(`${apiUrl}/tag/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()))
            .then(setPostTags);
   

    const addPostTag = (createPostTag) =>
        getToken().then((token) =>
            // fetch(`${apiUrl}/add`, {
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(createPostTag)
            }))

    const deletePostTag = (id) =>
        getToken().then((token) =>
            fetch(`/api/posttag/${id}`, {
                //fetch(`${apiUrl}/${tag.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },

            }))

    return (
        <PostTagContext.Provider value={{
            postTag, postTags, postTagz, getAllTagsForAPost, addPostTag, deletePostTag, getPostTagById
        }}>
            {props.children}
        </PostTagContext.Provider>
    );
};