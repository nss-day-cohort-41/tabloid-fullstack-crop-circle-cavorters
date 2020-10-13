import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider";
import { CommentProvider } from "./providers/CommentProvider";
import { TagProvider } from "./providers/TagProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import "./main.css"

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <PostProvider>
          <CommentProvider>
            <TagProvider>
              <Header />
              <ApplicationViews />
            </TagProvider>
          </CommentProvider>
        </PostProvider>
      </UserProfileProvider>
    </Router>

  );




}

export default App;
