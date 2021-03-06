import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { setAuthState } from "../../redux/auth/auth.action";
import { setCurrentUser } from "../../redux/user/user.action";
import { Button } from "../Button/Button.component";
import FormInput from "../form-input/form-input.component";
import OR from "../FormOR/FormOr.component";
import { setLoader } from "../../redux/meta/meta.action"

import {toast} from 'react-toastify'

import "./LoginForm.styles.scss";


const LoginForm = ({setCurrentUser ,setAuthStatus ,setLoader}) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [status, setFormStatus] = useState(false);
  const history = useHistory();

  const { email, password } = userCredentials;

  useEffect(() => {
    if (email && password) {
      setFormStatus(true);
    } else {
      setFormStatus(false);
    }
  }, [email, password]);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUserCredentials((prevState) => {
      return { ...prevState, [name]: value };
    });
    // console.log(userCredentials.email, userCredentials.password);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    // console.log(email,password);
    try{
      let newUser =await fetch(`${process.env.REACT_APP_API_URL}/users/login`,{
        headers: {
          'Content-Type': 'application/json'
        },
        method:"POST",
        body:JSON.stringify({
         email,
         password,
        })
      })
      let user = await newUser.json()

    // console.log(user);
    if(user.token){
      setCurrentUser(user)
      setAuthStatus({
        isAuthenticated:true,
        token:user.token
      })
        history.push(`/home`);
        toast.success("login Success",{position:toast.POSITION.TOP_CENTER,autoClose:1000})
    }else{
      toast.error("login failed:"+user.message,{position:toast.POSITION.TOP_CENTER})
    }
  }catch(err){
    toast.error("login failed:"+err.message,{position:toast.POSITION.TOP_CENTER})
    // console.log('error:' + err.message);
  }
  setLoader(false)
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="logo-image"></div>
        <FormInput
          name="email"
          type="email"
          value={email}
          label="Email"
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          label="Password"
          autoComplete="off"
          required
        />
        <Button
          buttonStyle="loginAndSignup"
          type={"submit"}
          buttonText={"Login"}
          status={status}
        />
        {/* <button className="login-button" type='submit'>Log in</button> */}
        <OR />
        <span className="fb">
          <i className="fab fa-facebook-square"></i> Log in with facebook
        </span>
        <span className="forgot"><Link to='/forgotAndResetPassword'>forgot password?</Link></span>
      </form>
      <div className="signup">
        <span>
          Don't have an account?{" "}
          <Link to="/signup" className="sign-up">
            Sign up
          </Link>
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

const mapStateToProps = (state) => ({
  authState: state.auth,
  loader: state.meta.loader
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setAuthStatus:(authState) => dispatch(setAuthState(authState)),
  setLoader: (loader) => dispatch(setLoader(loader))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
