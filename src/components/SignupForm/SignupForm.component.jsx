import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory,Link } from 'react-router-dom'
import { setAuthState } from "../../redux/auth/auth.action";
import { setCurrentUser } from "../../redux/user/user.action";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { Button } from "../Button/Button.component";
import FormInput from "../form-input/form-input.component";
import OR from "../FormOR/FormOr.component";
import "./SignupForm.styles.scss";

const SignupForm = ({ currentUser, setCurrentUser ,setAuthStatus}) => {
  const [userCredentials, setUserCredentials] = useState({email:'',fullName:'',userName:'',password:''});

  const [status, setFormStatus] = useState(false);

  const history = useHistory();
 
const {email,fullName,userName,password} = userCredentials

useEffect(() => {
  if(email && password && userName && fullName ){
    setFormStatus(true)
  }else{
    setFormStatus(false)
  }
},[email,password,userName,fullName])

const handleChange = (e) => {
      const { value, name } = e.target;
      setUserCredentials({...userCredentials,[name]:value})

  }

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(fullName,userName,email,password);
    let newUser =await fetch('http://127.0.0.1:3000/api/v1/users/signup',{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        userName,
        email,
        password,
        fullName
      })
    })
    
    let user = await newUser.json()
    // user = user.doc
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

  }

  return (
    
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form" >
        <div className="logo-image" ></div>
        <span>Sign up to see photos and videos <br/>from your friends.</span>
        <Button buttonStyle="loginAndSignup" type="submit" buttonText={<div className='fbtn'><i className="fab fa-facebook-square"></i> log in with facebook</div> } status={true} />
        <OR />
        <FormInput
          name="email"
          type="email"
          value={email}
          label="Email"
          onChange={handleChange}
          required
        />
        <FormInput
          name="fullName"
          type="text"
          value={fullName}
          label="Full Name"
          onChange={handleChange}
          required
        />
        <FormInput
          name="userName"
          type="text"
          value={userName}
          label="Username"
          onChange={handleChange}
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
          <Button buttonStyle="loginAndSignup" type="submit" buttonText={'Signup'} status={status} />

                  
        <span className='terms-and-cond'>By signing up, you agree to our Terms , Data<br/> Policy and Cookies Policy .</span>
      </form>
      <div className="signup">
        <span>
          Have an account?<Link to='/' className="sign-up">Log in</Link>
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
  currentUser: selectCurrentUser,
  authState: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setAuthStatus:(authState) => dispatch(setAuthState(authState))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);