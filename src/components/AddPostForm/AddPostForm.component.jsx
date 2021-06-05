import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "../Button/Button.component";
import FormInput from "../form-input/form-input.component";
import "./AddPostForm.styles.scss";

const AddPostForm = ({ currentUser, authState ,visibility,handleClick}) => {
  const [data, setData] = useState({ image: "", caption: "" });

  const { image, caption } = data;

  console.log(data);
  const handleChange = (e) => {
    e.preventDefault();
    console.log("change");

    const { value, name } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  console.log(currentUser);
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newUser = await fetch("http://127.0.0.1:3000/api/v1/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authState.token,
      },
      body: JSON.stringify({
        author: currentUser.id,
        postImage: image,
        postCaption: caption,
      }),
    });
    let user = await newUser.json();
    console.log(user);
  };

  return (
    <div className="PostForm-container" style={visibility==='show'?{display:'block'}:{display:'none'}}>
      <div className="postForm-title">
      <span>Create Post</span>
      <i class="far fa-eye-slash" onClick={handleClick}></i>
      </div>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="image"
          type="text"
          value={image}
          label="Post image url"
          onChange={handleChange}
          autoComplete="off"
          required
        />
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
