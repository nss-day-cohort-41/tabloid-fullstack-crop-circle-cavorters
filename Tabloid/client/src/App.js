import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider";
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
        <PostProvider>         
          <TagProvider>
            <PostTagProvider>
            <CategoryProvider>
              <Header />
              <ApplicationViews />
            </CategoryProvider>
          </PostTagProvider>
          </TagProvider>
        </PostProvider>
      </UserProfileProvider>
    </Router >
  );
}

export default App;
