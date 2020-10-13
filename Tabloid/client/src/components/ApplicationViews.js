import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostList from "./Posts/PostList";
import PostDetail from "./Posts/PostDetail";
import PostForm from "./Posts/PostForm";
import PostEditForm from "./Posts/PostEditForm";
import PostDelete from "./Posts/PostDelete";
import MyPosts from "./Posts/MyPosts";
import TagList from "./Tags/TagList";
import TagForm from "./Tags/TagForm";
import TagEditForm from "./Tags/TagEditForm";
import DeleteTagPrompt from "./Tags/DeleteTagPrompt";
import UserList from "./Users/UserList";
import CategoryList from "./Categories/CategoryList";
import CategoryAddForm from "./Categories/CategoryAddForm";
import CategoryEditForm from "./Categories/CategoryEditForm";
import UserDetails from "./Users/UserDetails";
import UserDeactivate from "./Users/UserDeactivate";
import UserActivate from "./Users/UserActivate";
import UserListDeactivated from "./Users/UserListDeactivated";
import UserEdit from "./Users/UserEdit";

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

        {/* ---- POST ROUTES ---- */}
        <Route path="/posts" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/posts/details/:id">
          {isLoggedIn ? <PostDetail /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/add">
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/edit/:id">
          {isLoggedIn ? <PostEditForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/delete/:id">
          {isLoggedIn ? <PostDelete /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/myposts" exact>
          {isLoggedIn ? <MyPosts /> : <Redirect to="/login" />}
        </Route>
        {/* END POST ROUTES */}

        <Route path="/categories" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/categories/add">
          {isLoggedIn ? <CategoryAddForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/categories/:id" exact>
          {isLoggedIn ? <CategoryEditForm /> : <Redirect to="/login" />}
        </Route>




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

        <Route path="/users/edit/:id" exact>
          {isLoggedIn && sessionUser.userTypeId === 1 ? <UserEdit /> : <Redirect to="/login" />}
        </Route>

        {/* TAGS ROUTES */}
        <Route path="/tags" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/tags/add">
          {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
        </Route>
        <Route path="/tags/:id" exact>
          {/* <Route path= "`/api/tags/edit/${id}`"> */}
          {isLoggedIn ? <TagEditForm /> : <Redirect to="/login" />}
        </Route>
        <Route path="/tags/delete/:id" exact>
          {isLoggedIn ? <DeleteTagPrompt /> : <Redirect to="/login" />}
        </Route>
        {/* END TAGS ROUTES */}

      </Switch>
    </main>
  );
}

