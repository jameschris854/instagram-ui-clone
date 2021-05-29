import React from "react";
import { ProfileImage } from "../ProfileImage/ProfileImage.component";
import "./Post.styles.scss";

export const Post = ({imageUrl,proImage,state}) => (
  <div className="post-wrapper">
    <div className="header">
      <ProfileImage image={proImage} state={state}/>
      <span>userName</span> 
      <i className="fas fa-ellipsis-h"></i>
    </div>
    <div className="image">
      <img src={`${imageUrl}`} alt="" />
    </div>
    <div className="reaction">
      <i className="far fa-heart"></i>
      <i className="far fa-comment"></i>
      <i className="far fa-paper-plane"></i>
      <i className="far fa-bookmark"></i>
    </div>
    <div className="comment-section">
      <i className="far fa-grin-alt"></i>
      <input type="text" placeholder="Add a comment…"/>
      <span>Post</span>
    </div>
  </div>
);
