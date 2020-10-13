import React, { useState, useEffect, useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useHistory, useParams, Link } from "react-router-dom";

const UserDeactivate = () => {
  const history = useHistory();
  const [ user, setUser ] = useState();
  const { users, updateUser, getUserId, getAllUsers } = useContext(UserProfileContext);
  const { id } = useParams();


  const adminCount = () => {
    getAllUsers()
    let count = 0;
    for(let admin of users) {
      if (admin.userTypeId === 1) {
        count++
      }
    }
    return count;
  }

  const deactivateUser = (e) => {
    e.preventDefault();
    const count = adminCount();

    if (count < 2) {
      alert("This is the last admin user. Assign new admin before deactivating")
      return null;
    }
    else {
      user.isActive = false;
      updateUser(user)
        .then(() => history.push("/users"));
    } 
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

            <h4>Are you sure you want to deactivate {user.fullName}?</h4>
            <hr />
            <div className="row">
              <div className="actionBtns">
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