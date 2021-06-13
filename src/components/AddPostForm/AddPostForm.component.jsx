import React, { useState } from "react";
import { connect } from "react-redux";
import { setPostData } from "../../redux/post/post.action";
import { setCurrentUser } from "../../redux/user/user.action";
import { Button } from "../Button/Button.component";
import FormInput from "../form-input/form-input.component";
import { useHistory } from "react-router-dom";

import "./AddPostForm.styles.scss";

const AddPostForm = ({
  currentUser,
  authState,
  visibility,
  handleClick,
  setCurrentUser,
  currentUserObj,
  currentPosts,
}) => {
  const [caption, setCaption] = useState("");
  const [prevImageUrl, setPrevImageUrl] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();

    // console.log("change");

    const { value } = e.target;

    setCaption(value);
  };

  const handleFileChange = async (e) => {
    e.preventDefault();

    // console.log("file up");

    // console.log(e.target.files[0]);

    let newPhoto = e.target.files[0];

    const formData = new FormData();

    formData.append("photo", newPhoto, newPhoto.name);

    // console.log(formData);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/posts/file`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authState.token,
        },
        body: formData,
      }
    );

    let imageData = await response.json();
    // console.log(imageData);

    if (imageData.status === "fail") {
      alert(imageData.message);
    } else {
      setPrevImageUrl(imageData.file);
    }

    // ...
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authState.token,
      },
      body: JSON.stringify({
        author: currentUser.id,
        postImage: prevImageUrl,
        postCaption: caption,
      }),
    });
    let createdPost = await res.json();
    if (createdPost.status === "success") {
      // console.log(createdPost.post);

      let updatedUserObj = currentUserObj;
      updatedUserObj.user.posts.unshift({
        id: createdPost.post.id,
        postCaption: createdPost.post.postCaption,
        postImage: createdPost.post.postImage,
        _id: createdPost.post.id,
      });
      setCurrentUser(updatedUserObj);
      setInterval(() => {
        history.go(0);
      }, 3000);

      // updatePosts(updatedPosts)
    }
    console.log(createdPost);
    setPrevImageUrl("");
    setCaption("");
  };

  return (
    <div
      className="PostForm-container"
      style={visibility === "show" ? { display: "flex" } : { display: "none" }}
    >
      <div className="postForm-title">
        <span>Create Post</span>
        <i className="far fa-eye-slash" onClick={handleClick}></i>
      </div>
      {!prevImageUrl?null:<img
        className="post-preview-image"
        src={`${process.env.REACT_APP_SERVER_URL}/img/posts/${prevImageUrl}`}
        alt=""
      />}
      <FormInput type="file" onChange={handleFileChange} />
      <form onSubmit={handleSubmit}>
        <FormInput
          name="caption"
          type="text"
          value={caption}
          label="Image Caption"
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <Button
          type={"submit"}
          buttonStyle="loginAndSignup"
          buttonText={"create"}
          status={true}
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser.user,
  currentUserObj: state.user.currentUser,
  authState: state.auth.authData,
  currentPosts: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
  updatePosts: (posts) => dispatch(setPostData(posts)),
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPostForm);
