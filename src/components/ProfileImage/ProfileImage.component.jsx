import React from "react";

import "./ProfileImage.styles.scss";

export const ProfileImage = ({ size, state, image,...otherProps}) => {
  return (
    <div className={`proPic-container ${size === "medium"? "medium":""}` } {...otherProps}>
      <div
        className={`profile-pic ${size === "large" ? "large" : ""}`}
      >
        <img src={`${image}`} alt="" />
      </div>
      <div className={`border ${size === "large" ? "large" : ""} ${state === "active"
            ? "active"
            : state === "none"
            ? "none"
            : state==='black-border'?'black-border': 'in-active'
        } `}></div>
    </div>
  );
};
