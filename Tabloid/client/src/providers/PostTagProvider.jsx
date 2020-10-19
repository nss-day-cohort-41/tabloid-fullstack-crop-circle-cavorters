import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostTagContext = React.createContext();

export const PostTagProvider = (props) => {
    const apiUrl = "/api/posttag";
    const { getToken } = useContext(UserProfileContext);
    const [postTags, setPostTags] = useState([]);
    const [postTag, setPostTag] = useState([]);
    


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
       
          
          
     const addPostTag = (createPostTag) =>
    getToken().then((token) =>
              fetch(apiUrl, {
                  method: "POST",
                  headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify(createPostTag)
}))

            //   .then(resp => {
            //       if (resp.ok) {
            //           return resp.json();
            //       }
            //       throw new Error("Unauthorized");
            //   })); 
        
    return (
        <PostTagContext.Provider value={{
            postTag, postTags, getAllTagsForAPost, addPostTag
        }}>
            {props.children}
        </PostTagContext.Provider>
    );
};