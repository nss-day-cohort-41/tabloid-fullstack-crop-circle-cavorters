import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
// import { CategoryContext } from "./CategoryProvider";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const apiUrl = "/api/category";
    // const { getToken } = useContext(CategoryContext);
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

    return (
        <CategoryContext.Provider value={{
            categories, GetAllCategories
        }}>
            {props.children}
        </CategoryContext.Provider>
    );
};

