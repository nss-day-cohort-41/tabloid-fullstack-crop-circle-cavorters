import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PostProvider } from "./providers/PostProvider";
import { CommentProvider } from "./providers/CommentProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import { TagProvider } from "./providers/TagProvider";
import { SubscriptionProvider } from "./providers/SubscriptionProvider";
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
                <SubscriptionProvider>
                  <Header />
                  <ApplicationViews />
                </SubscriptionProvider>
              </CategoryProvider>
            </CommentProvider>
          </TagProvider>
        </PostProvider>
      </UserProfileProvider>
    </Router >
  );




}

export default App;
