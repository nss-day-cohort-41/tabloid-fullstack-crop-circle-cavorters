import React, { useContext, useEffect } from "react";
import User from "./User";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";

export default function UserList() {
  const { users, getAllUsers } = useContext(UserProfileContext);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section>
    <Link to="/inactive">View Deactivated</Link>
      {users.map(u =>
        <User key={u.id} user={u}/>
      )}
    </section>
  );
}