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
        <div className="status-button">
            <Link style={{ textDecoration: 'none' }} to="/inactive">
                <button className="view">View Deactivated</button>
            </Link>
        </div>
        {users.map(u =>
            <User key={u.id} user={u}/>
        )}
    </section>
  );
}