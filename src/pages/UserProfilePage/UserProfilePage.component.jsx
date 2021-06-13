import React, { useEffect } from "react";
import "./UserProfilePage.styles.scss";
import Header from "../../components/Header/Header.component";
import { connect } from "react-redux";
import noPosts from "../../assets/images/noPosts.jpg";
import { useParams } from "react-router-dom";
import { useState } from "react";

const UserProfilePage = ({ authState }) => {
  // console.log(authState);
  // const [id, setId] = useState("");
  const [userData, setUserData] = useState({
  email: "",
  fullName: "",
  id: "",
  photo: "default.jpg",
  posts: [],
  userName: "",
  _id: ""});
  // console.log(id);

  // setId();
    const id = useParams().id
  useEffect(() => {
    async function userData() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
        headers: { Authorization: "Bearer " + authState.token},
      });
      let userData = await response.json();
      // console.log(userData);
      setUserData(userData.user)
    }
    userData();
  }, [authState,id]);

  return (
    <div className="profile-page-wrapper">
      <Header />
      <div className="profile-page-container">
        <div className="stats-container">
          <div className="profile-pic">
            <img src={process.env.REACT_APP_SERVER_URL+'/img/users/'+ userData.photo} alt="defaultPosts" />
          </div>
          <div className="name">{userData.userName}</div>
          <div></div>
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
          <div className="username">{userData.fullName}</div>
        </div>
        <div className="postIcon">
          <i className="fas fa-border-all"></i>
          <span> POSTS</span>
        </div>
        <div className="profilePage-posts-container">
          {userData.posts.length < 1 ? (
            <img className="no-posts" src={noPosts} alt="" />
          ) : (
            userData.posts.map((post) => (
              <div className="previewPost" key={post._id}>
                <img
                  src={
                    process.env.REACT_APP_SERVER_URL +
                    "/img/posts/" +
                    post.postImage
                  }
                  alt=""
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authState: state.auth.authData,
});

export default connect(mapStateToProps)(UserProfilePage);

/* <div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div> */
