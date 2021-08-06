import Signin from "./components/Signin"
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Verification from "./components/Verification"
import store from './Store';
import LandingPage from "./components/Home";
import HNavbar from "./components/Home_NavBar.js";
import "./assets/styles/app.css";
import UserProfileEdit from "./user_profile/UserProfileEdit";
import Login from "./components/Login"
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
        <Route exact path="/">
            <HNavbar />
            <LandingPage />
          </Route>
          
          <Route exact path="/signup">
           
            <Signin />
          </Route>
          <Route exact path="/login">
           
           <Login />
         </Route>

          <Route exact path="/verification">
            <Verification/>
            
          </Route>
          
          <Route exact path="/id/edit">
            <UserProfileEdit />
          </Route>
        </Switch>
      </Router>
      
    </Provider>
  );
}

export default App;
