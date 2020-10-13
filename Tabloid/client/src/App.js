import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider";
import { CommentProvider } from "./providers/CommentProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import { TagProvider } from "./providers/TagProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import "./main.css"

function App() {
  return (
    <Router>
      <UserProfileProvider>
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
      </UserProfileProvider>
    </Router >
  );




}

export default App;
