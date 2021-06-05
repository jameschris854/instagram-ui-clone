import React, { useState } from "react";
import { connect } from "react-redux";

import Header from "../Header/Header.component";
import { ProfileImage } from "../ProfileImage/ProfileImage.component";

import "./Config.styles.scss";
const Config = ({ currentUser, authState }) => {
  const [cred, setCred] = useState({
    fullName: currentUser.fullName,
    userName: currentUser.userName,
  });
  const [credSec, setCredSec] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [tab, setTab] = useState("profile");

  const { fullName, userName } = cred;
  const { currentPassword, newPassword } = credSec;

  const handleChange = (e) => {
    console.log(cred);
    const { value, name } = e.target;
    if (tab === "profile") {
      setCred((prevState) => ({ ...prevState, [name]: value }));
      setCredSec({currentPassword: "",
      newPassword: "",})
    } else if (tab === "security") {
      setCredSec((prevState) => ({ ...prevState, [name]: value }));
      setCred({
        fullName: currentUser.fullName,
        userName: currentUser.userName,
      })
    }
  };

  const handleSubmitUpdateDetails = async (e) => {
    e.preventDefault();

    let res = await fetch("http://127.0.0.1:3000/api/v1/users", {
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
    let res = await fetch("http://127.0.0.1:3000/api/v1/users/updatePassword", {
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
            </div>
            <div
              className={`update-profile-container ${
                tab === "profile" ? "show" : ""
              }`}
            >
              <form onSubmit={handleSubmitUpdateDetails}>
                <span className="config-user">
                  <ProfileImage
                    image={currentUser.photo}
                    state={"none"}
                    size={"small"}
                  />
                  {currentUser.userName}
                </span>
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
                    image={currentUser.photo}
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

export default connect(mapStateToProps)(Config);
