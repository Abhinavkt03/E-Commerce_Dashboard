import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const navigate = useNavigate();

    // If user logged in then he will not able to go to signup page.
    useEffect(() => {
        const auth = localStorage.getItem('users');
        if (auth) {
            navigate('/');
        }
    })


    // Make a request to post data into Database
    const collectData = async () => {
        console.log({ name, email, pass });
        let response = await fetch("http://localhost:5000/register", {
            method: "POST",
            body: JSON.stringify({ name: name, email: email, password: pass }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        response = await response.json();
        console.warn(response);
        // Store User Information in Local Storage
        localStorage.setItem('users', JSON.stringify(response.result));
        localStorage.setItem('token', JSON.stringify(response.auth));
        // After Submitting data go to home page
        navigate('/');
    }
    return (
        <div className='signup_form'>
            <h1>Sign Up</h1>
            <input className='inputBox' type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Your Name' />
            <input className='inputBox' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter Your Email' />
            <input className='inputBox' type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} placeholder='Enter Your Password' />
            <div className="button">
                <button onClick={collectData} className='register_button' type="button">Sign Up</button>
            </div>
        </div>
    )
};