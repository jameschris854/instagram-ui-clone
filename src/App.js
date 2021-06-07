import "./App.scss";
import { HomePage } from "./pages/homePage/HomePage.component";
import { Switch, Route } from "react-router-dom";
import { LoginPage } from "./pages/loginPage/LoginPage.component";
import { SignupPage } from "./pages/SignupPage/SignupPage.component";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ProfilePage from "./pages/ProfilePage/ProfilePage.component";
import ConfigPage from "./pages/ConfigPage/ConfigPage.component";

function App({ authState, currentUser,theme }) {
  console.log(currentUser);
  if(theme === 'dark'){
    document.documentElement.style.setProperty('--borderColor','#353535');
    document.documentElement.style.setProperty('--background','#000000');
    document.documentElement.style.setProperty('--secondary-background','rgb(0, 0, 0)');
    document.documentElement.style.setProperty('--primary-color','rgb(255, 255, 255)');
    document.documentElement.style.setProperty('--secondary-color','rgb(219, 219, 219)');
  }else{
    document.documentElement.style.setProperty('--borderColor','#dbdbdb');
    document.documentElement.style.setProperty('--background','#fafafa');
    document.documentElement.style.setProperty('--secondary-background','white');
    document.documentElement.style.setProperty('--primary-color','black');
    document.documentElement.style.setProperty('--secondary-color','rgb(65, 65, 65)');

  }
  return (
    <div className="App">
      <Switch>
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/" component={LoginPage} />
        <Route
          exact
          path="/home"
          render={() => (authState.isAuthenticated ? <HomePage /> : <Redirect to="/" />)}
        />
        {
          currentUser?
          <Route
            exact
            path={`/profile/${currentUser.id}`}
            component={ProfilePage}
          />: <Redirect to='/' />
        }
        {
          currentUser?
          <Route
            exact
            path={`/profile/${currentUser.id}/config`}
            component={ConfigPage}
          />: <Redirect to='/' />
        }
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authState: state.auth.authData,
  currentUser: state.user.currentUser.user,
  theme:state.meta.theme
});

export default connect(mapStateToProps)(App);
