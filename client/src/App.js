<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
import Signin from "./components/Signin"
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Verification from "./components/Verification"
import store from './Store';
=======
import LandingPage from "./Home";
import HNavbar from "./components/Home_NavBar.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/styles/app.css";
import UserProfileEdit from "./user_profile/UserProfileEdit";
import Signin from "./Signin";
import { Provider } from "react-redux";
import store from "./Store";

>>>>>>> 0dd8d0a6a51476270682e4c0ebba5b03700957c1
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
<<<<<<< HEAD
          
          <Route exact path="/signin">
           
            <Signin />
          </Route>

          <Route exact path="/verification">
            <Verification/>
            
          </Route>
        </Switch>
      </Router>
      
=======
          <Route exact path="/">
            <HNavbar />
            <LandingPage />
          </Route>

          <Route exact path="/signin">
            <Signin />
          </Route>

          <Route exact path="/id/edit">
            <UserProfileEdit />
          </Route>
        </Switch>
      </Router>
>>>>>>> 0dd8d0a6a51476270682e4c0ebba5b03700957c1
    </Provider>
  );
}

export default App;
