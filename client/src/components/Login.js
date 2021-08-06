import { Row, Col, Container, Image, Form, Button } from 'react-bootstrap'
import React, { useState ,useRef} from 'react'
import secure from "../assets/images/Secure.svg"
import "../assets/styles/login.css"
import GoogleButton from 'react-google-button'
import GoogleLogin from 'react-google-login'

import { useDispatch } from 'react-redux'
const Login = () => {
    const textinput = useRef(null);
    const [uname, setUname] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const [icon, seticon] = useState('visibility_off')
    const Google = (response) => {
        console.log(response.profileObj)
        
        let userDetails = {
            "username": response.profileObj.name,
            "email": response.profileObj.email,
            "password": response.profileObj.googleId
        }
        dispatch({type:'LOG_IN',payload:userDetails})

       


    }
    function handleclick() {
        if (textinput.current.type === "password") {
            textinput.current.type = "text"
            seticon('visibility')
        }
        else {
            textinput.current.type = "password"
            seticon('visibility_off')
        }
    }
    const FormHandler = (e)=>{
        e.preventDefault()
        let details = {
            user_name:uname,
            password:password,  
        }
        //console.log(details)
        dispatch({type:"LOG_IN",payload:details}) 
    }
    return (
        <div id="margin">
            <Container>


                <Row>
                    <Col lg={6} >
                        <Image id="img" src={secure} rounded />
                    </Col>
                    <Col lg={6} id="left-line">
                        <Row >
                            <form id="signin-form" onSubmit={(e) => { FormHandler(e) }}>
                                <label>
                                    Enter the username:
                                </label>
                                <input type='text' onChange={(e) => { setUname(e.target.value) }} placeholder="Username" />
                                <label>
                                    Enter the password:
                                    <i><span className="material-icons" style={{ float: 'right' }} onClick={handleclick}>{icon}</span></i>
                                </label>
                                
                                <input type='password' ref={textinput} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                                <button id="signin-btn">Log in</button>
                                <hr id='form-hr' />
                                <GoogleLogin
                                buttonText='Log in with Google'
                                render={renderProps => (
                                    <GoogleButton onClick={renderProps.onClick} style={{width:'80%',margin:'0 auto',height:'50px'}} disabled={renderProps.disabled}></GoogleButton>
                                )}
                            
                                
                                onSuccess={Google}
                                onFailure={Google}
                                cookiePolicy={'single_host_origin'}
                                clientId='204444527685-akpo3ibtak32h4oupm0oavn4ceo1tarv.apps.googleusercontent.com'
                            />

                            </form>
                        </Row>
                    </Col>
                </Row>


            </Container>

        </div>



    );
}
export default Login;
