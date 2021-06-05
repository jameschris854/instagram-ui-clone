import React from "react";
import  SignupForm  from "../../components/SignupForm/SignupForm.component";
import './SignupPage.styles.scss'

export class SignupPage extends React.Component {
  render() {
    return (
      <div className="login-page-container">
        <SignupForm />
      </div>
    );
  }
}
