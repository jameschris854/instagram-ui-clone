import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import FormInput from "../form-input/form-input.component";
import "./LoginForm.styles.scss";

export const LoginForm = () => {
  const [email,changeEmail] = useState('')
  const [password,changePassword] = useState('')
  const [user,setUser] = useState('null')
  const history = useHistory();
 

  const handleChange = (e) => {
      const { value, name } = e.target;
      if(name === 'email'){
        changeEmail(value)
      }else if(name === 'password'){
        changePassword(value)
      }
      console.log(email,password);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email,password);
    setUser('james')
    console.log(user);
    let auth=true
    !auth?alert('login failed'):history.push(`/home`)

  }

  return (
    
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form" >
        <img className="logo-image" src="/logo.png" alt="" />
        <FormInput
          name="email"
          type="email"
          value={email}
          label="email"
          onChange={handleChange}
          autoComplete="on"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          label="password"
          autoComplete="on"
          required
        />
        
          <button className="login-button" type='submit'>Log in</button>
          
        _________or____________
        <span className="fb">
          <i className="fab fa-facebook-square"></i> Log in with facebook
        </span>
        <span className="forgot">forgot password?</span>
      </form>
      <div className="signup">
        <span>
          Don't have an account? <span className="sign-up">Sign up</span>{" "}
        </span>
      </div>
      <span>Get the app.</span>
      <div className="Download">
        <div className="image">
          <img src="static/images/AppStore.png" alt="" />
        </div>
        <div className="image">
          <img src="static/images/PlayStore.png" alt="" />
        </div>
      </div>
    </div>
  );
};
