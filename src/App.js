import "./App.scss";
import { HomePage } from "./pages/homePage/HomePage.component";
import { Switch, Route } from "react-router-dom";
import { LoginPage } from "./pages/loginPage/LoginPage.component";
import { SignupPage } from "./pages/SignupPage/SignupPage.component";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ProfilePage from "./pages/ProfilePage/ProfilePage.component";
import Config from "./components/Config/Config.component";

function App({ authState, currentUser }) {
  console.log(currentUser);
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
            component={Config}
          />: <Redirect to='/' />
        }
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authState: state.auth.authData,
  currentUser: state.user.currentUser.user,
});

export default connect(mapStateToProps)(App);
