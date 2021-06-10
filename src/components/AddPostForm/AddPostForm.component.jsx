import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "../Button/Button.component";
import FormInput from "../form-input/form-input.component";

import "./AddPostForm.styles.scss";

const AddPostForm = ({ currentUser, authState, visibility, handleClick }) => {
  const [caption, setCaption] = useState("");
  const [prevImageUrl, setPrevImageUrl] = useState("");

  const handleChange = (e) => {
    e.preventDefault();

    console.log("change");

    const { value } = e.target;

    setCaption(value);
  };

  console.log(currentUser);

  const handleFileChange = async (e) => {
    e.preventDefault();

    console.log("file up");

    console.log(e.target.files[0]);

    let newPhoto = e.target.files[0];

    const formData = new FormData();

    formData.append("photo", newPhoto, newPhoto.name);

    console.log(formData);
    const response = await fetch("http://127.0.0.1:3000/api/v1/posts/file", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authState.token,
      },
      body: formData,
    });

    let imageData = await response.json();
    console.log(imageData);
    setPrevImageUrl(imageData.file);

 
    // ...
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch("http://127.0.0.1:3000/api/v1/posts/", {
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
    console.log(createdPost);
    setPrevImageUrl('');
    setCaption('')
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
      <img className='post-preview-image' src={`http://localhost:3000/posts/${prevImageUrl}`} alt="" />
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
  authState: state.auth.authData,
});

export default connect(mapStateToProps)(AddPostForm);
