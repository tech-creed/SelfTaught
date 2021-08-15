import Signin from "./components/Signin";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Verification from "./components/Verification";
import store from "./Store";
import LandingPage from "./components/Home";
import Forgot from "./components/ForgotPass";
import ChangePassword from "./components/ChangePass";
import HNavbar from "./components/Home_NavBar.js";
import "./assets/styles/app.css";
import "./assets/styles/index.css";
import UserProfileEdit from "./user_profile/UserProfileEdit";
import Login from "./components/Login";
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
            <HNavbar />
            <Signin />
          </Route>
          <Route exact path="/login">
            <HNavbar />
            <Login />
          </Route>

          <Route exact path="/forgot_pass">
            <HNavbar />
            <Forgot />
          </Route>

          <Route
            exact
            path="/auth/mail-verification/:tmp_id/:tmp_arr_token/:usr_id"
          >
            <ChangePassword />
          </Route>
          <Route exact path="/verification">
            <Verification />
          </Route>

          <Route exact path="/:id/edit">
            <UserProfileEdit />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
