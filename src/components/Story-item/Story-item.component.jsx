import React from "react";
import { ProfileImage } from "../ProfileImage/ProfileImage.component";
import "./Story-item.styles.scss";

export const StoryItem = ({proImage,state,username}) => (
  <div className="item-container">
     <ProfileImage size='large' state={state} image={proImage}  />
     <div className='name'>{username}</div>
  </div>
);
