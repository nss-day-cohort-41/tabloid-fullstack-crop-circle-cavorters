import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const apiUrl = "/api/tag";
    const { getToken } = useContext(UserProfileContext);

    const [tags, setTags] = useState([]);
    const [setIdTags] = useState([]);

    //Method for pulling all the current tags
    const getAllTags = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setTags));

    const getTagById = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/tag/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
        .then(setIdTags));
        

    //Method for adding a tag
    const addTag = (tag) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tag)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));

    const updateTag = (tag) =>
        getToken().then((token) =>
            fetch(`/api/tag/${tag.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
                , body: JSON.stringify(tag)
            })
        );
    //     const updateTag = (tag) =>
    // getToken().then((token) =>
    //     fetch(`/api/tags/${tag.id}`, {
    //         method: "PUT",
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json"
    //         }
    //          ,body: JSON.stringify(tag)
    //     }).then(resp => {
    //         if (resp.ok) {
    //             return resp.json();
    //         }
    //        //  throw new Error("Unauthorized");
    //     }));

    return (
        <TagContext.Provider value={{
            tags, getTagById, getAllTags, addTag, updateTag
        }}>
            {props.children}
        </TagContext.Provider>
    );
};