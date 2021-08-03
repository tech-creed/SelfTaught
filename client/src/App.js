import LandingPage from "./Home";
import Navbar from "./components/Home_NavBar.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/styles/app.css";
import UserProfileEdit from "./user_profile/UserProfileEdit";
import "./App.css";
import Signin from "./components/Signin";
import { Provider } from "react-redux";
import store from "./Store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar />
            <LandingPage />
          </Route>

          <Route exact path="/signin">
            <Signin />
          </Route>

          <Route exact path="/username/edit">
            <UserProfileEdit />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
