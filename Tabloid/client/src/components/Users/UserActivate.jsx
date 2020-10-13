import React, { useState, useEffect, useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useHistory, useParams, Link } from "react-router-dom";

const UserDeactivate = () => {
  const history = useHistory();
  const [ user, setUser ] = useState();
  const { updateUser, getUserId } = useContext(UserProfileContext);
  const { id } = useParams();

  const activateUser = (e) => {
    e.preventDefault();
    user.isActive = true;
    updateUser(user)
        .then(() => history.push("/inactive"));
  }
  
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
        <main className="usersContainer">
          <section className="users-table">
            <h1>Deactivate</h1>

            <h4>Are you sure you want to activate {user.fullName}?</h4>
            <hr />
            <div className="row">
              <div className="actionBtns">
                <div className="form-group">
                  <input type="submit" onClick={activateUser} value="Confirm" className="btn btn-primary" />&nbsp;&nbsp;|&nbsp;&nbsp;
                  <Link to="/inactive">
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