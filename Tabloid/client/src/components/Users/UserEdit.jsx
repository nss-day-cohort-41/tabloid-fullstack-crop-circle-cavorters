import React, { useState, useEffect, useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useHistory, useParams, Link } from "react-router-dom";

const UserEdit = () => {
  const history = useHistory();
  const [ user, setUser ] = useState();
  const [ userTypeId, setUserTypeId ] = useState();
  const { updateUser, getUserId, userTypes, getAllUserTypes } = useContext(UserProfileContext);
  const { id } = useParams();

  const editUser = (e) => {
    e.preventDefault();
    const parsedUserType = parseInt(userTypeId)
    user.userTypeId = parsedUserType;
    updateUser(user)
        .then(() => history.push("/users"));
  }

  const handleChange = (e) => {
    console.log("UserType Selected");
    setUserTypeId(e.target.value);
  }

  console.log(id)
  console.log(user)
  
  useEffect(() => {
    getUserId(id)
    .then((users) => {
        getAllUserTypes()
        setUser(users)
    })
  }, []);

  if (!user) {
    return null;
  }  

  return (
    <>
        <main className="users-container">
            <section className="users-table">
                <h1>Change User Type</h1>

                <h4>Select a user type for {user.fullName}?</h4>
                <hr />

                <select value={userTypeId} onChange={handleChange}> 
                {userTypes.map(userType =>
                    <option value={userType.id}>
                        {userType.name}
                    </option>
                )}
                </select>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <input type="submit" onClick={editUser} value="Confirm" className="btn btn-primary" />&nbsp;&nbsp;|&nbsp;&nbsp;
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

export default UserEdit;