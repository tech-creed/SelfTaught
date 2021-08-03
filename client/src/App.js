import LandingPage from "./Home";
import Navbar from "./components/Home_NavBar.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/styles/app.css";
import UserProfileEdit from "./user_profile/UserProfileEdit";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navbar />
          <LandingPage />
        </Route>

        <Route exact path="/username/edit">
          <UserProfileEdit />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
