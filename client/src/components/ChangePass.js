import { Row, Col, Container, Image, Form, Button } from "react-bootstrap";
import React, { useState, useRef } from "react";
import "../assets/styles/forgot_pass.css";
import Tilt from "react-parallax-tilt";
import forgot_img from "../assets/images/change_pass.svg";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ChangePassword = () => {
  const pass_input = useRef(null);
  const [icon, seticon] = useState("visibility_off");
  const history = useHistory();
  var cookie_get = Cookies.get("r_p");
  const { tmp_arr_token } = useParams();

  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [warning, setWarning] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  function show_hide() {
    if (pass_input.current.type === "password") {
      pass_input.current.type = "text";
      seticon("visibility");
    } else {
      pass_input.current.type = "password";
      seticon("visibility_off");
    }
  }

  if (tmp_arr_token == cookie_get) {
    const FormHandle = async (e) => {
      e.preventDefault();
      let details = {
        username: username,
        password: password,
      };
      await fetch("http://localhost:4000/auth/mail-verified/" + tmp_arr_token, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      })
        .then((res) => {
          setError(null);
          return res.json().then((err) => {
            if (err.message === "CleanRun") {
              Cookies.remove("r_p");
              setIsPending(false);
              history.push("/login");
            } else {
              setIsPending(false);
              setWarning(err.message);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <div id="margin">
        <Container>
          <Row>
            <Col lg={6}>
              <Tilt>
                <Image id="img" src={forgot_img} rounded />
              </Tilt>
            </Col>
            <Col lg={6} id="left-line">
              <Row>
                <form
                  id="forgot-form"
                  onSubmit={(e) => {
                    FormHandle(e);
                  }}
                >
                  <h1 id="form-heading">Change Password</h1>
                  <label>Enter the Username:</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    placeholder="Username"
                    required
                  />
                  <label>
                    Enter New Password:
                    <span
                      className="material-icons"
                      style={{
                        float: "right",
                        userSelect: "none",
                        cursor: "pointer",
                      }}
                      onClick={show_hide}
                    >
                      {icon}
                    </span>
                  </label>
                  <input
                    type="password"
                    ref={pass_input}
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                    placeholder="New Password"
                    required
                  />
                  {warning && (
                    <div style={{ textAlign: "center", color: "red" }}>
                      {warning}
                    </div>
                  )}
                  <button id="forgot-btn">Sumbit</button>
                  <hr id="form-hr" />
                </form>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return <div style={{ textAlign: "center" }}>Link / Session Expired</div>;
  }
};

export default ChangePassword;
