import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import signin from "../images/signin.svg"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import GoogleButton from 'react-google-button'
import GoogleLogin from 'react-google-login'
import Tilt from 'react-parallax-tilt';
import { useHistory } from 'react-router'

export default function Signin() {
    
    const auth = useSelector(state=>state.auth)
    const history = useHistory()
    const dispatch = useDispatch()
    const [fname, setFname] = useState('')
    const [uname, setUname] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [ps,setPs] = useState('')
    const [cps,setCps] = useState('')
    const [icon,seticon] = useState('fa fa-eye-slash')
    const [cicon,setcicon] = useState('fa fa-eye-slash')
    const passref = useRef(null)
    const cpassref = useRef(null)
    const textinput = useRef(null);
    const textinput2 = useRef(null);
    let valid_password_check = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    const handleclick=()=>{
        if (textinput.current.type === "password") {
            textinput.current.type = "text"
            seticon('fa fa-eye')
        }
        else {
            textinput.current.type = "password"
            seticon('fa fa-eye-slash')
        }

    }
    const handleclick2=()=>{
        if (textinput2.current.type === "password") {
            textinput2.current.type = "text"
            setcicon('fa fa-eye')
        }
        else {
            textinput2.current.type = "password"
            setcicon('fa fa-eye-slash')
        }

    }
    const passwordStrengthHandler=(val)=>{
        setPassword(val);
        
        if(valid_password_check.test(password)){
            setPs('strong')
            passref.current.style.display = 'block'
        }
        else{
            setPs('weak')
            passref.current.style.display = 'block'
        }

    }
    const Google = (response) => {


    }

    const FormHandler = (e) => {
        e.preventDefault()
        console.log(auth)

        if(confirmPassword === password){
            cpassref.current.style.display = 'none'
            let details = {
                fullname: fname,
                password: password,
                email: email
    
            }
            console.log(details)
            dispatch({ type: "SIGN_IN", payload: details })
            
            

        }
        else{
            cpassref.current.style.display = 'block'
            setCps('Password does not matched')
        }
        

    }
    useEffect(()=>{
        if(auth.uid !== '' && auth.uid !== 'user already found'){
            history.push('/verification')
        }
    },[auth.uid])
   

    return (
        <Row id="signin-row">
           
            <Col sm={12} md={6} id="signin-col-2">
                <form id="signin-form" onSubmit={(e) => { FormHandler(e) }}>
                    <input type='text' onChange={(e) => { setFname(e.target.value) }} placeholder="Name" />
                    <input type='email' onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
                    {ps === 'weak'? <p id ="ps" class='wps' ref={passref}>{ ps }</p>:<p id ="ps" class='sps' ref={passref}>{ ps }</p>}
                    <div class="inputWithIcon">
                       
                        <input type='password' onChange={(e) => { passwordStrengthHandler(e.target.value) }} placeholder="Password" />
                        <i ref={textinput} onClick={handleclick} class={icon}></i>
                        

                    </div>
                    
                   
                    <div class="inputWithIcon">
                        <input type='password' onChange={(e) => { setconfirmPassword(e.target.value) }} placeholder="Confirm password" />
                        <i ref={textinput2} onClick={handleclick2} class={cicon}></i>
                        <p id ="cps" ref={cpassref}><strong>{ cps }</strong></p>

                    </div>
                   
                    <button id="signin-btn">Sign up</button>
                    <hr id='form-hr' />
                    <div id='google-btn'>
                    <GoogleLogin
                        buttonText='Sign up with Google'
                        render={renderProps => (
                            <GoogleButton onClick={renderProps.onClick} style={{width:'100%'}} disabled={renderProps.disabled}></GoogleButton>
                        )}
                        
                        onSuccess={Google}
                        onFailure={Google}
                        cookiePolicy={'single_host_origin'}
                        clientId=""
                    />

                    </div>
                    
                </form>

            </Col>


        </Row>
    )
}
