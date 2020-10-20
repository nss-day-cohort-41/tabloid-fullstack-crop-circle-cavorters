import React, { createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SubscriptionContext = createContext();

export function SubscriptionProvider(props) {
    const { getToken } = useContext(UserProfileContext)



    

    const getById = (id) => {
        getToken().then((token) =>
          fetch(`/api/subscription/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          })).then((resp) => resp.json())
          .then(setPost);
      };

    const addSubscription = (subscription) => {
        return getToken().then((token) =>
            fetch("/api/subscription/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(subscription)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }

            }))
    };


    return (

        <SubscriptionContext.Provider value={{ addSubscription }}>
            {props.children}
        </SubscriptionContext.Provider>
    );
}