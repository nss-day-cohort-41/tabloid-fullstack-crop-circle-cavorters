import React, { useState, useEffect, useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useHistory, useParams, Link } from "react-router-dom";

const UserDeactivate = () => {
  const history = useHistory();
  const [ user, setUser ] = useState();
  const { updateUser, getUserId } = useContext(UserProfileContext);
  const { id } = useParams();

  const deactivateUser = (e) => {
    e.preventDefault();
    user.isActive = false;
    updateUser(user)
        .then(() => history.push("/users"));
  }

  console.log(id)
  console.log(user)
  
  useEffect(() => {
    getUserId(id)
    .then((user) => {
        setUser(user)
    })
  }, []);

  if (!user) {
    return null;
  }  

  return (
    <>
        <main className="users-container">
            <section className="users-table">
                <h1>Deactivate</h1>

                <h4>Are you sure you want to deactivate {user.fullName}?</h4>
                <hr />
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <input type="submit" onClick={deactivateUser} value="Confirm" className="btn btn-primary" />&nbsp;&nbsp;|&nbsp;&nbsp;
                            <Link to="/users">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
      
    </>
  );
}

export default UserDeactivate;