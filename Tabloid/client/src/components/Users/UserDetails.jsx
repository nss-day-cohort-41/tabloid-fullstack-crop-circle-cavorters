import React, { useEffect, useContext, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useParams } from "react-router-dom";
import User from "./User";

const UserDetails = () => {
  const [ user, setUser ] = useState();
  const { getUserProfile } = useContext(UserProfileContext);
  const { id } = useParams();

  console.log(id)
  useEffect(() => {
    getUserProfile(id).then(setUser);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <h2>{user.fullName}</h2>
          {user.imageLocation !== null ?
          <img src={user.imageLocation} alt={user.fullName}/> :
          <img src="https://robohash.org/numquamutut.png?size=150x150&set=set1" alt="DefaultImage"/>}
          <p><strong>Display Name:</strong> {user.displayName}</p>
          <p><strong>Email:</strong> {user.userType.name}</p>
          <p><strong>Creation Date:</strong> {user.userType.name}</p>
          <p><strong>User Type:</strong> {user.userType.name}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;