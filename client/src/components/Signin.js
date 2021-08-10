import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import signin from "../assets/images/signin.svg";
import "../assets/styles/Sigin.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GoogleButton from "react-google-button";
import GoogleLogin from "react-google-login";
import Tilt from "react-parallax-tilt";
import { useHistory } from "react-router";
import Navbar from "./Home_NavBar";

export default function Signin() {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const [fname, setFname] = useState("");
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [ps, setPs] = useState("");
  const [cps, setCps] = useState("");
  const [icon, seticon] = useState("fa fa-eye-slash");
  const [cicon, setcicon] = useState("fa fa-eye-slash");
  const passref = useRef(null);
  const cpassref = useRef(null);
  const textinput = useRef(null);
  const textinput2 = useRef(null);
  const pass = useRef(null);
  const pass2 = useRef(null);
  let valid_password_check = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  const handleclick = () => {
    if (pass.current.type === "password") {
      pass.current.type = "text";
      seticon("fa fa-eye");
    } else {
      pass.current.type = "password";
      seticon("fa fa-eye-slash");
    }
  };
  const handleclick2 = () => {
    if (pass2.current.type === "password") {
      pass2.current.type = "text";
      setcicon("fa fa-eye");
    } else {
      pass2.current.type = "password";
      setcicon("fa fa-eye-slash");
    }
  };
  const passwordStrengthHandler = (val) => {
    setPassword(val);

    if (valid_password_check.test(password)) {
      setPs("strong");
      passref.current.style.display = "block";
    } else {
      setPs("weak");
      passref.current.style.display = "block";
    }
  };
  const Google = (response) => {
    console.log(response.profileObj);

    let userDetails = {
      username: response.profileObj.name,
      email: response.profileObj.email,
      password: response.profileObj.googleId,
    };
    dispatch({ type: "SIGN_IN", payload: userDetails });
  };

  const FormHandler = (e) => {
    e.preventDefault();
    console.log(auth);

    if (confirmPassword === password) {
      cpassref.current.style.display = "none";
      let details = {
        fullname: fname,
        password: password,
        email: email,
      };
      console.log(details);
      dispatch({ type: "SIGN_IN", payload: details });
    } else {
      cpassref.current.style.display = "block";
      setCps("Password does not matched");
    }
  };
  useEffect(() => {
    if (auth.uid !== "" && auth.uid !== "user already found") {
      history.push("/verification");
    }
  }, [auth.uid]);

  return (
    <div>
      <Row id="signin-row">
        <Col sm={12} md={6}>
          <div class="tilt-container">
            <Tilt>
              <img class="tilt-img" src={signin} />
              <p id="tilt-p">Join with us to make difference</p>
            </Tilt>
          </div>
        </Col>

        <Col sm={12} md={6} id="signin-col-2">
          <form
            id="signin-form"
            onSubmit={(e) => {
              FormHandler(e);
            }}
          >
            <input
              type="text"
              onChange={(e) => {
                setFname(e.target.value);
              }}
              placeholder="Name"
            />
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
            {ps === "weak" ? (
              <p id="ps" class="wps" ref={passref}>
                {ps}
              </p>
            ) : (
              <p id="ps" class="sps" ref={passref}>
                {ps}
              </p>
            )}
            <div class="inputWithIcon">
              <input
                type="password"
                ref={pass}
                onChange={(e) => {
                  passwordStrengthHandler(e.target.value);
                }}
                placeholder="Password"
              />
              <i ref={textinput} onClick={handleclick} class={icon}></i>
            </div>

            <div class="inputWithIcon">
              <input
                type="password"
                ref={pass2}
                onChange={(e) => {
                  setconfirmPassword(e.target.value);
                }}
                placeholder="Confirm password"
              />
              <i ref={textinput2} onClick={handleclick2} class={cicon}></i>
              <p id="cps" ref={cpassref}>
                <strong>{cps}</strong>
              </p>
            </div>

            <button id="signin-btn">Sign up</button>
            <hr id="form-hr" />
            <div id="google-btn">
              <GoogleLogin
                buttonText="Sign up with Google"
                render={(renderProps) => (
                  <GoogleButton
                    onClick={renderProps.onClick}
                    style={{ width: "100%" }}
                    disabled={renderProps.disabled}
                  ></GoogleButton>
                )}
                onSuccess={Google}
                onFailure={Google}
                cookiePolicy={"single_host_origin"}
                clientId="204444527685-akpo3ibtak32h4oupm0oavn4ceo1tarv.apps.googleusercontent.com"
              />
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
}
