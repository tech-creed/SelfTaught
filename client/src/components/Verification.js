import React from 'react'
import { useSelector } from 'react-redux'
import { useRef,useEffect } from 'react'
import { useHistory } from 'react-router'
import email from "../images/email.svg"
import "../assets/styles/Sigin.css"
export default function Verification() {
    const state = useSelector(state => state.auth)
    let d1 = useRef(null)
    let d2 = useRef(null)
    let d3 = useRef(null)
    let d4 = useRef(null)
    let d5 = useRef(null)
    let d6 = useRef(null)
    const history = useHistory()
    const check = () => {
    
       const code = d1.current.value+d2.current.value+d3.current.value+d4.current.value+d5.current.value+d6.current.value
       console.log(code,state)

        
       if(code === state.verificationCode){
           history.push('/profile')

       }
    }
    return (
        <div>  
            <div class='verification-container'>
                
                <img src={email}/>
                <p class='code-p'>We have sent you an access code for email verification</p> 
                <div class='code-row'>
                    <input class='code-col' ref={d1}/>
                    <input class='code-col' ref={d2}/>
                    <input class='code-col' ref={d3}/>
                    <input class='code-col' ref={d4}/>
                    <input class='code-col' ref={d5}/>
                    <input class='code-col' ref={d6}/>
                </div>
                <div class='code-row'>
                    <button class='code-arrow' onClick={check}><i class="fas fa-angle-right"></i></button>

                </div>
                   
              
               


            </div>
            
        </div>
    )
}
