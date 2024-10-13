import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    // const [showPassword, setShowPassword] = useState(false);
    // const handleClickShowPassword = () => setShowPassword(!showPassword);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('users');
        if (auth) {
            navigate('/');
        }
    })

    const collectData = async () => {
        console.warn({ email, password });
        let response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        response = await response.json();
        console.warn(response);
        if (response.auth) {
            localStorage.setItem('users', JSON.stringify(response.result));
            localStorage.setItem('token', JSON.stringify(response.auth));
            navigate('/');
        } else {
            navigate('/login');
        }
    }
    return (
        <>
            <div className='login_form'>
                <h1>Login</h1>
                <input className='inputBox' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter Your Email' />
                <input className='inputBox' type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter Your Password' />
                {/* <span onClick={handleClickShowPassword}><i className="far fa-eye" id="togglePassword"></i></span> */}
                <div className="button">
                    <button onClick={collectData} className='login_button' type="button">Login</button>
                </div>
            </div>
        </>
    )
}