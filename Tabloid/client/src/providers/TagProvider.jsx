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


    return (
        <TagContext.Provider value={{
            tags, getAllTags, addTag
        }}>
            {props.children}
        </TagContext.Provider>
    );
};