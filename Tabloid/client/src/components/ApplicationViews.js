
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostList from "./Posts/PostList";
import TagList from "./Tags/TagList";
import TagForm from "./Tags/TagForm";
import TagEditForm from "./Tags/TagEditForm";
import UserList from "./Users/UserList";
import UserDetails from "./Users/UserDetails";
import UserDeactivate from "./Users/UserDeactivate";
import UserActivate from "./Users/UserActivate";
import UserListDeactivated from "./Users/UserListDeactivated";


export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));


  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>


        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/posts">
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        {/* TAGS ROUTES */}
        <Route path="/tags" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/tags/add">
          {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
        </Route>
        <Route path= "/tags/:id">
        {/* <Route path= "`/api/tags/edit/${id}`"> */}
          {isLoggedIn ? <TagEditForm /> : <Redirect to="/login" />}
        </Route>
        {/* END TAGS ROUTES */}


        <Route path="/users" exact>
        {isLoggedIn && sessionUser.userTypeId === 1 ? <UserList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/users/:id" exact>
        {isLoggedIn && sessionUser.userTypeId === 1 ? <UserDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/users/deactivate/:id">
        {isLoggedIn && sessionUser.userTypeId === 1 ? <UserDeactivate /> : <Redirect to="/login" />}
        </Route>

        <Route path="/inactive" exact>
        {isLoggedIn && sessionUser.userTypeId === 1 ? <UserListDeactivated /> : <Redirect to="/login" />}
        </Route>

        <Route path="/inactive/:id" exact>
        {isLoggedIn && sessionUser.userTypeId === 1 ? <UserActivate /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </main>
  );
};
