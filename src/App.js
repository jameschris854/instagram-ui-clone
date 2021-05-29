import './App.scss';
import { HomePage } from './pages/homePage/HomePage.component';
import {Switch,Route } from 'react-router-dom'
import {LoginPage} from './pages/loginPage/LoginPage.component'
function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/home' component={HomePage} />
        </Switch>
    </div>
  );
}

export default App;
