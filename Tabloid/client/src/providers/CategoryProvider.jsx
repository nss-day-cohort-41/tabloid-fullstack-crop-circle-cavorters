import React, { useState, useContext } from "react";
// import { useEffect } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const apiUrl = "/api/category";
    const { getToken } = useContext(UserProfileContext);
    const [categories, setCategories] = useState([]);


    const GetAllCategories = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setCategories));

    const addCategory = (category) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));


    const editCategory = (category) =>
        getToken().then((token) =>
            fetch(`/api/category/${category.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            }));


    return (
        <CategoryContext.Provider value={{
            categories, GetAllCategories, addCategory, editCategory
        }}>
            {props.children}
        </CategoryContext.Provider>
    );
};

