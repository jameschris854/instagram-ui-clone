import React from "react";

import "./ProfileImage.styles.scss";

export const ProfileImage = ({ size ,state , image}) => {
  return (
    <div className={`profile-pic ${size === 'large'? 'large':''} ${state === 'active' ? 'active' : state === 'none' ? 'none' :'in-active'} `} >
      <img src={`${image}`} alt="" />
    </div>
  );
};
