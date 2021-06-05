import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { setAuthState } from "../../redux/auth/auth.action";
import { setCurrentUser } from "../../redux/user/user.action";
import { Button } from "../Button/Button.component";
import FormInput from "../form-input/form-input.component";
import "./LoginForm.styles.scss";

const LoginForm = ({setCurrentUser ,setAuthStatus}) => {
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
    console.log(userCredentials.email, userCredentials.password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email,password);
    try{
      let newUser =await fetch('http://127.0.0.1:3000/api/v1/users/login',{
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
    
    console.log(user);
    if(user.token){
      setCurrentUser(user)
      setAuthStatus({
        isAuthenticated:true,
        token:user.token
      })
      setTimeout(() => {
        history.push(`/home`);

      }, 1000);

    }else{

      alert("login failed")

    }
  }catch(err){
    alert("login failed")
    console.log('error:' + err.message);
  }
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
        _________or____________
        <span className="fb">
          <i className="fab fa-facebook-square"></i> Log in with facebook
        </span>
        <span className="forgot">forgot password?</span>
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
  authState: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setAuthStatus:(authState) => dispatch(setAuthState(authState))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
