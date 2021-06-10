import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ForgotPasswordPage.styles.scss";
import ForgotPasword from "../../components/forgorPassword/ForgotPassword.component";
import Resetpassword from "../../components/ResetPassword/ResetPassword.component";

const ForgotPasswordPage = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    newPassword: "",
    token: "",
  });
  const [formPage, setfromPage] = useState("forgotPassword");

  const [status, setFormStatus] = useState(false);

  const history = useHistory();

  const { email, newPassword, token } = userCredentials;

  useEffect(() => {
    if (
      (formPage === "forgotPassword" && email) ||
      (formPage === "resetPassword" && newPassword && token)
    ) {
      setFormStatus(true);
    } else {
      setFormStatus(false);
    }
  }, [email, formPage, newPassword, token]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formPage === "forgotPassword") {
      console.log(email);

      let res = await fetch(
        "http://127.0.0.1:3000/api/v1/users/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );
      console.log(res);
      let resObj = await res.json();
      if (resObj.status === "success") {
        setfromPage("resetPassword");
      } else {
        alert("no user ");
      }
      console.log(resObj);
    } else if (formPage === "resetPassword") {
      console.log(email);

      let res = await fetch(
        "http://127.0.0.1:3000/api/v1/users/resetPassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            passwordResetToken: token,
            newPassword,
          }),
        }
      );
      console.log(res);
      let resObj = await res.json();
      if (resObj.status === "success") {
        setfromPage("forgetPassword");
        history.push('/')
      } else {
        alert("no user ");
      }
      console.log(resObj);
    }
  };

  return (
    <div className="forgot-password-page-container">
      {formPage === "forgotPassword" ? (
        <ForgotPasword
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          status={status}
          email={email}
        />
      ) : (
        <Resetpassword
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          status={status}
          newPassword={newPassword}
          token={token}
        />
      )}
    </div>
  );
};

export default ForgotPasswordPage;
