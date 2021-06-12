import React, { useState } from "react";
import { connect } from "react-redux";
import FormInput from "../../components/form-input/form-input.component";

import Header from "../../components/Header/Header.component";
import { ProfileImage } from "../../components/ProfileImage/ProfileImage.component";

import "./ConfigPage.styles.scss";

const ConfigPage = ({ currentUser, authState }) => {
  const [cred, setCred] = useState({
    fullName: currentUser.fullName,
    userName: currentUser.userName,
  });
  const [credSec, setCredSec] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [passwordDelAcc, setPassword] = useState("");

  const [tab, setTab] = useState("profile");

  const [prevImageUrl, setPrevImageUrl] = useState(`${currentUser.photo}`);

  const { fullName, userName } = cred;
  const { currentPassword, newPassword } = credSec;

  const handleFileChange = async (e) => {
    e.preventDefault();

    console.log("file up");

    console.log(e.target.files[0]);

    let newPhoto = e.target.files[0];

    const formData = new FormData();

    formData.append("photo", newPhoto, newPhoto.name);

    console.log(formData);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/file`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authState.token,
      },
      body: formData,
    });

    let imageData = await response.json();
    console.log(imageData);

    if (imageData.status === "fail") {
      alert(imageData.message);
    } else {
      setPrevImageUrl(imageData.file);
    }

    // ...
  };

  const handleChange = (e) => {
    console.log(cred);
    const { value, name } = e.target;
    if (tab === "profile") {
      setCred((prevState) => ({ ...prevState, [name]: value }));
      setCredSec({ currentPassword: "", newPassword: "" });
      setPassword("");
    } else if (tab === "security") {
      setCredSec((prevState) => ({ ...prevState, [name]: value }));
      setCred({
        fullName: currentUser.fullName,
        userName: currentUser.userName,
      });
      setPassword("");
    } else if (tab === "delete-account") {
      setPassword(value);
      setCred({
        fullName: currentUser.fullName,
        userName: currentUser.userName,
      });
      setCredSec({ currentPassword: "", newPassword: "" });
    }
  };
  const handleUpdateProfilePic = async (e) => {
    e.preventDefault();

    let res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authState.token,
      },
      body: JSON.stringify({
        photo: prevImageUrl,
      }),
    });
    let updatedProfilePic = await res.json();
    console.log(updatedProfilePic);
    setPrevImageUrl('');
  };

  const handleSubmitUpdateDetails = async (e) => {
    e.preventDefault();
    let res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authState.token,
      },
      body: JSON.stringify({
        fullName,
        userName,
      }),
    });
    let updatedUser = await res.json();

    if (updatedUser.status === "success") {
      alert("update successfull");
    }

    console.log(updatedUser);
  };
  const handleSubmitUpdatePassword = async (e) => {
    e.preventDefault();
    console.log("updating password");
    let res = await fetch(`${process.env.REACT_APP_API_URL}/users/updatePassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authState.token,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });
    let updatedUser = await res.json();

    if (updatedUser.status === "success") {
      alert("update successfull");
    }
    console.log(updatedUser);
  };

  const handleDeleteAccount = async () => {
    console.log("deeting...");
    let res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authState.token,
      },
      body: JSON.stringify({
        currentPassword: passwordDelAcc,
      }),
    });
    let deletedUser = await res.json();
    console.log(deletedUser);
    if (deletedUser.status === "success") {
      alert("account successfully deleted");
    }
  };

  return (
    <div className="config-wrapper">
      <Header />
      <div className="config-container-wrapper-big">
        <div className="config-container-wrapper">
          <div className="config-container">
            <div className="config-catagories-container">
              <div
                className={`config-catagories ${
                  tab === "profile" ? "active" : ""
                }`}
                onClick={() => setTab("profile")}
              >
                Edit Profile
              </div>
              <div
                className={`config-catagories ${
                  tab === "security" ? "active" : ""
                }`}
                onClick={() => setTab("security")}
              >
                Change Password
              </div>
              <div
                className={`config-catagories ${
                  tab === "delete-account" ? "active" : ""
                }`}
                onClick={() => setTab("delete-account")}
              >
                Delete Account
              </div>
            </div>
            <div
              className={`update-profile-container ${
                tab === "profile" ? "show" : ""
              }`}
            >
              <form onSubmit={handleSubmitUpdateDetails}>
                <span className="config-user">
                  <ProfileImage
                    image={`${prevImageUrl}`}
                    state={"none"}
                    size={"small"}
                  />
                  {currentUser.userName}
                </span>
                <div className='upload-profile-file-config'>
                  <FormInput type="file" onChange={handleFileChange} style={{margin:'0',paddingLeft:'0',paddingTop:'10px'}} />
                </div>
                <div
                  type="submit"
                  onClick={handleUpdateProfilePic}
                  className="config-button file"
                >
                  Change Profile Pic
                </div>
                <span className="config-input-label">FULL NAME</span>
                <input
                  className="config-input"
                  type="text"
                  value={fullName}
                  onChange={handleChange}
                  name="fullName"
                  required
                  autoComplete="off"
                />
                <span className="config-input-label">USER NAME</span>
                <input
                  className="config-input"
                  type="text"
                  value={userName}
                  onChange={handleChange}
                  name="userName"
                  required
                  autoComplete="off"
                />
                <div
                  type="submit"
                  onClick={handleSubmitUpdateDetails}
                  className="config-button"
                >
                  update profile
                </div>
              </form>
            </div>
            <div
              className={`update-security-container ${
                tab === "security" ? "show" : ""
              }`}
            >
              <form onSubmit={handleSubmitUpdatePassword}>
                <span className="config-user">
                  <ProfileImage
                    image={"/" + currentUser.photo}
                    state={"none"}
                    size={"small"}
                  />
                  {currentUser.userName}
                </span>
                <span className="config-input-label">CURRENT PASSWORD</span>
                <input
                  className="config-input"
                  type="password"
                  value={currentPassword}
                  onChange={handleChange}
                  name="currentPassword"
                  required
                  autoComplete="off"
                />
                <span className="config-input-label">NEW PASSWORD</span>
                <input
                  className="config-input"
                  type="password"
                  value={newPassword}
                  onChange={handleChange}
                  name="newPassword"
                  required
                  autoComplete="off"
                />
                <div
                  type="submit"
                  onClick={handleSubmitUpdatePassword}
                  className="config-button"
                >
                  update password
                </div>
              </form>
            </div>
            <div
              className={`delete-account-container ${
                tab === "delete-account" ? "show" : ""
              }`}
            >
              <form onSubmit={handleDeleteAccount}>
                <span className="config-user">
                  <ProfileImage
                    image={"/" + currentUser.photo}
                    state={"none"}
                    size={"small"}
                  />
                  {currentUser.userName}
                </span>
                <span className="config-input-label">CURRENT PASSWORD</span>
                <input
                  className="config-input"
                  type="password"
                  value={passwordDelAcc}
                  onChange={handleChange}
                  name="currentPassword"
                  required
                  autoComplete="off"
                />
                <div
                  type="submit"
                  onClick={handleDeleteAccount}
                  className="config-button delete"
                >
                  Delete Account
                </div>
              </form>
              <br />
              <span>This action is irreversible*</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser.user,
  authState: state.auth.authData,
});

export default connect(mapStateToProps)(ConfigPage);
