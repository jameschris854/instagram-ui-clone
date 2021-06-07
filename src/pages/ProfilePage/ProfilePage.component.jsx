import React from "react";
import "./ProfilePage.styles.scss";
import Header from "../../components/Header/Header.component";
import { connect } from "react-redux";
import noPosts from "../../assets/images/noPosts.jpg";
import { Link } from "react-router-dom";

const ProfilePage = ({ currentUser, match, authState }) => {

  const handlePostDelete = async (id) => {
    console.log("deleting post" + id);
    let res = await fetch(`http://127.0.0.1:3000/api/v1/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authState.token,
      },
    });
    let deletedPost = await res.json();
    if (deletedPost.state === "success") {
      alert("post deleted");
    }
    console.log(deletedPost);
  };
  return (
    <div className="profile-page-wrapper">
      <Header />
      <div className="profile-page-container">
        <div className="stats-container">
          <div className="profile-pic">
            <img src={currentUser.photo} alt="defaultPosts" />
          </div>
          <div className="name">{currentUser.fullName}</div>
          <Link className="settings" to={match.path + "/config"}>
            <svg aria-label="Options" class="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z" fill-rule="evenodd"></path></svg>
          </Link>
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
          {currentUser.posts.length < 1 ? (
            <img src={noPosts} alt="" />
          ) : (
            currentUser.posts.map((post) => (
              <div className="previewPost" key={post.id}>
                <img src={post.postImage} alt="" />
                <i
                  class="del-post-btn far fa-trash-alt"
                  onClick={() => handlePostDelete(post.id)}
                ></i>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser.user,
  authState: state.auth.authData,
});

export default connect(mapStateToProps)(ProfilePage);

/* <div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div>
<div className='previewPost'><img src='https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt="" /></div> */
