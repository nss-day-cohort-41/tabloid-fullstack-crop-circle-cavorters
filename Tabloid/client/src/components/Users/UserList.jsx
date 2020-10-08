import React, { useContext, useEffect } from "react";
import User from "./User";
import { UserProfileContext } from "../../providers/UserProfileProvider";

export default function UserList() {
  const { users, getAllUsers } = useContext(UserProfileContext);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section>
      {users.map(u =>
        <User key={u.id} user={u}/>
      )}
    </section>
  );
}