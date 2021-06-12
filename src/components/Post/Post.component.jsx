import React from "react";
import { ProfileImage } from "../ProfileImage/ProfileImage.component";
import { useHistory } from "react-router-dom";
import "./Post.styles.scss";

export const Post = ({ imageUrl, proImage, state,userId, userName, caption }) => {
  let history = useHistory();
  console.log(userId);
  return (
    <div className="post-wrapper">
      <div className="header">
        <ProfileImage
          image={proImage}
          state={state}
          size={"medium"}
          onClick={() =>userId? history.push(`/userprofile/${userId}`): null}
        />
        <span>{userName}</span>
        <i className="fas fa-ellipsis-h"></i>
      </div>
      <div className="image">
        <img
          src={`${process.env.REACT_APP_SERVER_URL}/img/posts/${imageUrl}`}
          alt=""
        />
      </div>
      <div className="reaction">
        <i className="far fa-heart"></i>
        <i className="far fa-comment"></i>
        <i className="far fa-paper-plane"></i>
        <i className="far fa-bookmark"></i>
      </div>
      <div className="post-caption">C.C : {caption}</div>
      <div className="comment-section">
        <i className="far fa-grin-alt"></i>
        <input type="text" placeholder="Add a comment…" />
        <span>Post</span>
      </div>
    </div>
  );
};
