import React from "react";
import { ProfileImage } from "../ProfileImage/ProfileImage.component";
import "./Story-item.styles.scss";

export const StoryItem = ({proImage,state}) => (
  <div className="item-container">
     <ProfileImage size='large' state={state} image={proImage}/>
     <div className='name'>default</div>
  </div>
);
