import React from "react";
import { ProfileImage } from "../ProfileImage/ProfileImage.component";
import './Header.styles.scss'


const Header = () => (
  <div className="header-container">
    <div className="logo-container">
      <img src='/logo.png' alt="" />
    </div>
    <div className='input'>
      <input type="text"/>
      <span><i className="fas fa-search"></i>Search</span>
    </div>
    <div className="header-icons">
      <i className="fas fa-home"></i>
      <i className="fab fa-facebook-messenger"></i>
      <i className="far fa-compass"></i>
      <i className="far fa-heart"></i>
      <ProfileImage state='none' image='https://qph.fs.quoracdn.net/main-qimg-20df28f3b31895e56cba6dbc0515c635'/>
    </div>
  </div>
);

export default Header;
