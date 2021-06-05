import React from "react";
import { connect } from "react-redux";
import { ProfileImage } from "../ProfileImage/ProfileImage.component";
import { Link } from 'react-router-dom'

import './Header.styles.scss'


const Header = ({currentUser}) => (
  <div className="header-container">
    <div className="logo-container">
      <img src='/logo.png' alt="" />
    </div>
    <div className='input'>
      <input type="text"/>
      <span><i className="fas fa-search"></i>Search</span>
    </div>
    <div className="header-icons">
      <Link to='/home'><i className="fas fa-home"></i></Link> 
      <i className="fab fa-facebook-messenger"></i>
      <i className="far fa-compass"></i>
      <i className="far fa-heart"></i>
      <Link to={`/profile/${currentUser.id}`}>
      <ProfileImage state='none' image={currentUser.photo} size='medium' style={{height:'39px',width:'39px',marginLeft:'10px'}}/>
      </Link>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  currentUser:state.user.currentUser.user
})

export default connect(mapStateToProps)(Header);
