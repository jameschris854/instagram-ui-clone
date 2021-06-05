import React from "react";
import "./ProfilePage.styles.scss";
import Header from '../../components/Header/Header.component'
import { connect } from "react-redux";
import noPosts from '../../assets/images/noPosts.jpg' 
import { Link } from "react-router-dom";


const ProfilePage = ({currentUser,match}) => {
    console.log(currentUser);
  const handleClick = () => {
    console.log("click");
  };
  console.log(match);
  return (
    <div className="profile-page-wrapper">
        <Header />
      <div className="profile-page-container">
        <div className="stats-container">
          <div className="profile-pic">
            <img
              src={currentUser.photo}
              alt="defaultPosts"
            />
          </div>
          <div className="name">{currentUser.fullName}</div>
          <Link to={match.path + '/config'}><div className="settings" onClick={handleClick}>
            <i className="fas fa-cog"></i>
          </div></Link> 
          <div className="stats">
            <div className="stat">
              <span>1m</span> posts
            </div>
            <div className="stat">
              <span>100m</span> followers
            </div>
            <div className="stat">
              <span>100m</span> following
            </div>
          </div>
          <div className="username">{currentUser.userName}</div>
        </div>
        <div className="postIcon">
          <i className="fas fa-border-all"></i>
          <span> POSTS</span>
        </div>
        <div className="profilePage-posts-container">
            {
             currentUser.posts.length < 1 ? <img src={noPosts} alt="" />:
             currentUser.posts.map((post) =><div className='previewPost' key={post.id}><img src={post.postImage} alt="" /></div>)
            }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    currentUser:state.user.currentUser.user
})

export default connect(mapStateToProps)(ProfilePage);

/* <div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div> */