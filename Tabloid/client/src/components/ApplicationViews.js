
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


export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);


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
      </Switch>
    </main>
  );
};
