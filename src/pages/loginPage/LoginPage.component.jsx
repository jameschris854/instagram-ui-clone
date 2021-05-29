import React from "react";
import { LoginForm } from "../../components/LoginForm/LoginForm.component";
import { LoginPhone } from "../../components/LoginPhone/loginPhone.component";
import './LoginPage.styles.scss'

export class LoginPage extends React.Component {
  render() {
    return (
      <div className="login-page-container">
        <LoginPhone />
        <LoginForm />
      </div>
    );
  }
}
