import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button.component";
import FormInput from "../form-input/form-input.component";
import OR from "../FormOR/FormOr.component";

const ForgotPassword = ({handleSubmit,handleChange,email,status}) => (
     <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
              <div className="forgot-logo-image"></div>
              <div className="forgot-password-title">Trouble Logging In?</div>
              <div className="forgot-passsword-p">
                Enter your email, phone, or username and we'll <br /> send you a
                link to get back into your account
              </div>
              <FormInput
                name="email"
                type="email"
                value={email}
                label="Email"
                onChange={handleChange}
                required
              />
              <Button
                buttonStyle="loginAndSignup"
                type="submit"
                buttonText={"Send Login Link"}
                status={status}
              />
              <OR />
              <div className="forgot-password-title">Create New Account</div>
              <div className='forgot-password-login'>
                <Link to="/" className="sign-up">
                  back to Log in
                </Link>
              </div>
            </form>
          </div>
);

export default ForgotPassword;