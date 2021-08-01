import LandingPage from "./Home";
import Navbar from "./components/Home_NavBar.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/app.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navbar />
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
