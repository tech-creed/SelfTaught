import LandingPage from "./Home";
import HNavbar from "./components/Home_NavBar.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/styles/app.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HNavbar />
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
