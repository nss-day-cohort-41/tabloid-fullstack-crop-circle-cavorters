import React, { useContext, useEffect } from "react";
import User from "./User";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";

export default function UserListDeactivated() {
  const { users, getAllInactiveUsers } = useContext(UserProfileContext);

  useEffect(() => {
    getAllInactiveUsers();
  }, []);

  return (
    <section>
      <div className="status-button">
        <Link to="/users">
          <button className="view">View All Active</button>
        </Link>
      </div>
      {users.map(u =>
        <User key={u.id} user={u}/>
      )}
    </section>
  );
}