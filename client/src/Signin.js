import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import signin from "./images/signin.svg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GoogleButton from "react-google-button";
import GoogleLogin from "react-google-login";
import Tilt from "react-parallax-tilt";
import "./assets/styles/signin.css";

export default function Signin() {
  const dispatch = useDispatch();

  const [fname, setFname] = useState("");
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [icon, seticon] = useState("visibility_off");
  const [email, setEmail] = useState("");
  const [ps, setPs] = useState("");
  const [cps, setCps] = useState("");
  const passref = useRef(null);
  const cpassref = useRef(null);
  const textinput = useRef(null);
  let valid_password_check = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  const handleclick = () => {
    if (textinput.current.type === "password") {
      textinput.current.type = "text";
      seticon("visibility");
    } else {
      textinput.current.type = "password";
      seticon("visibility_off");
    }
  };
  const passwordStrengthHandler = (val) => {
    setPassword(val);

    if (valid_password_check.test(password)) {
      setPs("strong");
      passref.current.style.display = "block";
    } else {
      if (password !== "") {
        setPs("weak");
        passref.current.style.display = "block";
      } else {
        setPs("");
      }
    }
  };
  const Google = (response) => {};

  const FormHandler = (e) => {
    e.preventDefault();

    if (confirmPassword === password) {
      cpassref.current.style.display = "none";
      let details = {
        full_name: fname,
        user_name: uname,
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
  return (
    <Row id="signin-row">
      <Col sm={12} md={6} id="signin-col-1">
        <div id="tilt-container">
          <Tilt>
            <img id="signin-img" src={signin} />
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
              <strong>{ps}</strong>
            </p>
          ) : (
            <p id="ps" class="sps" ref={passref}>
              <strong>{ps}</strong>
            </p>
          )}

          <input
            type="password"
            ref={textinput}
            onChange={(e) => {
              passwordStrengthHandler(e.target.value);
            }}
            placeholder="Password"
          ></input>

          <input
            type="password"
            ref={textinput}
            onChange={(e) => {
              setconfirmPassword(e.target.value);
            }}
            placeholder="Confirm password"
          />
          <p id="cps" ref={cpassref}>
            <strong>{cps}</strong>
          </p>
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
              clientId=""
            />
          </div>
        </form>
      </Col>
    </Row>
  );
}
