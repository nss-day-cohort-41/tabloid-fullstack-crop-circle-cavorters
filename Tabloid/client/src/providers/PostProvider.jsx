import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const apiUrl = "/api/post";
  const { getToken } = useContext(UserProfileContext);

  const [posts, setPosts] = useState([]);

  //   const getAllPosts = () => {
  //     return fetch(apiUrl)
  //       .then((res) => res.json())
  //       .then(setPosts);
  //   };

  const getAllPosts = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setPosts));
  };

  const getById = (id) => {
    getToken().then((token) =>
      fetch(`apiUrl/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).then(resp => resp.json());
  };

  return (
    <PostContext.Provider value={{
      posts, getAllPosts, getById
    }}>
      {props.children}
    </PostContext.Provider>
  );

}