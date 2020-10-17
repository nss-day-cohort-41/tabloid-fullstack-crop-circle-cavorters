import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider";
import { CommentProvider } from "./providers/CommentProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import { PostTagProvider } from "./providers/PostTagProvider";
import { TagProvider } from "./providers/TagProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import "./main.css"

function App() {
  return (
    <Router>
      <UserProfileProvider>
      <PostTagProvider>
        <PostProvider>         
          <TagProvider>
            <CommentProvider>
              <CategoryProvider>
                <Header />
                <ApplicationViews />
              </CategoryProvider>
            </CommentProvider>
          </TagProvider>
        </PostProvider>
        </PostTagProvider>
      </UserProfileProvider>
    </Router >
  );




}

export default App;
