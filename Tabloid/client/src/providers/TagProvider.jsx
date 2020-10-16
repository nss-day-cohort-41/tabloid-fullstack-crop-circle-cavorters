import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const apiUrl = "/api/tag";
    const { getToken } = useContext(UserProfileContext);
    const [tags, setTags] = useState([]);
    

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
            fetch(`/api/tag/${id}`, {
           // fetch(`${apiUrl}/tag/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()))
        //.then(setTags));
        

  
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
        //fetch(`${apiUrl}/${tag.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        }));


        const deleteTag = (id) =>
        getToken().then((token) =>
        fetch(`/api/tag/${id}`, {
        //fetch(`${apiUrl}/${tag.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
           
        }))     //.then(result => result.json())
   

        


    return (
        <TagContext.Provider value={{
            tags, getTagById, getAllTags, addTag, updateTag, deleteTag
        }}>
            {props.children}
        </TagContext.Provider>
    );
};