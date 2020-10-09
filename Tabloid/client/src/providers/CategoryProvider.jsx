import React, { useState, useContext } from "react";
import { CategoryContext } from "./CategoryProvider";

export const PostContext = React.createContext();

export const CategoryProvider = (props) => {
    const apiUrl = "/api/category";
    const { getToken } = useContext(CatgoryContext);

    const [posts, setPosts] = useState([]);

    const GetAllCategories = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setPosts));

    return (
        <CategoryContext.Provider value={{
            categories, GetAllCategories
        }}>
            {props.children}
        </CategoryContext.Provider>
    );
};