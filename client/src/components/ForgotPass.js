import { Row, Col, Container, Image, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import "../assets/styles/forgot_pass.css";
import Tilt from "react-parallax-tilt";
import forgot_img from "../assets/images/Forgot.svg";
import Cookies from "js-cookie";

const Reeset = () => {
  const [username, setUsername] = useState("");
  const [usermail, setMail] = useState("");
  const [warning, setWarning] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const FormHandle = async (e) => {
    e.preventDefault();
    let details = {
      username: username,
      mail_id: usermail,
    };
    await fetch("http://localhost:3000/auth/forgot_pass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not Connect to Server");
        }
        return res.json();
      })
      .then((s_data) => {
        setIsPending(false);
        setWarning(s_data.message);
        console.log(s_data);
        Cookies.set("r_p", s_data.token);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
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
                <h1 id="form-heading">Forgot Password</h1>
                <label>Enter the Username:</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Username"
                  required
                />
                <label>Enter the Mail-ID:</label>

                <input
                  type="email"
                  onChange={(e) => {
                    setMail(e.target.value);
                  }}
                  placeholder="Mail-ID"
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
};

export default Reeset;
