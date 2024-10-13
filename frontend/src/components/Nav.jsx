import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
    const auth = localStorage.getItem('users');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/')
    }
    return (
        <>
            <div className="navbar">
            <img className='nav-logo' src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2021/09/Build-a-Responsive-Navigation-Bar-Using-HTML-and-CSS-Only-featured.png?q=50&fit=crop&w=1100&h=618&dpr=1.5" alt="Logo" />
                {auth ?
                    <ul className='nav-ul'>
                        <li><Link to='/'>Products</Link></li>
                        <li><Link to='/add-product'>Add Products</Link></li>
                        {/* <li><Link to='/update/:id'>Update Products</Link></li> */}
                        <li><Link to='/profile'>Profile</Link></li>
                        <li><Link onClick={logout} to='/signup'>Logout</Link></li>


                    </ul>
                    :
                    <ul className='nav-ul nav-right'>
                        <li><Link to='/signup'>Sign Up</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                    </ul>
                }
            </div>
        </>
    )
}