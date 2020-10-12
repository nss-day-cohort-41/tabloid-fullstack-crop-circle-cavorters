import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider";
import { CommentProvider } from "./providers/CommentProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import "./main.css"

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <CommentProvider>

          <PostProvider>
            <Header />
            <ApplicationViews />
          </PostProvider>
        </CommentProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
