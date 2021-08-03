import "./assets/styles/home_navbar.css";
import logo from "./assets/images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="top_navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="authentication_links">
        <Link to="/resigter">Register</Link>
        <Link to="/login">LogIn</Link>
      </div>
    </div>
  );
};

export default Navbar;
