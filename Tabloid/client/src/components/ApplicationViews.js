import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostList from "./Posts/PostList";
import CommentList from "./Comments/CommentList";
import CommentAddForm from "./Comments/CommentAddForm";
import CommentEditForm from "./Comments/CommentEditForm.js";
import CommentDelete from "./Comments/CommentDelete";
import UserList from "./Users/UserList";
import UserDetails from "./Users/UserDetails";
import UserDeactivate from "./Users/UserDeactivate";
import UserActivate from "./Users/UserActivate";
import UserListDeactivated from "./Users/UserListDeactivated";
import { CommentProvider } from "../providers/CommentProvider";


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

        {/* Comment Routes */}

        <Route path="/posts/comments/:id" exact>
          {isLoggedIn ? <CommentProvider> <CommentList /> </CommentProvider> : <Redirect to="/login" />}
        </Route>

        {/* <Route path="comments/add/:id">
          {isLoggedIn ? <CommentProvider> <CommentAddForm /></CommentProvider> : <Redirect to="/login" />}
        </Route> */}

        {/* <Route path="comment/:id/edit">
          {isLoggedIn ? <CommentProvider> <CommentEditForm /></CommentProvider> : <Redirect to="/login" />}
        </Route> */}

        {/* <Route path="comment/:id/delete">
          {isLoggedIn ? <CommentProvider> <CommentDelete /></CommentProvider> : <Redirect to="/login" />}
        </Route> */}

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
