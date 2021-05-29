import React from "react";
import { PostContainer } from "../Post-container/Post-container.component";
import { StoryContainer } from "../Story-container/Story-container.component";
import "./main-container.styles.scss";

export const MainContainer = () => (
  <div className="main-container">
    <StoryContainer />
    <PostContainer />
  </div>
);
