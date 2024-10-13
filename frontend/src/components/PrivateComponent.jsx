import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';

export default function PrivateComponent(){
    const auth = localStorage.getItem('users');
    return(
        auth?<Outlet/>:<Navigate to='/signup'/>
    )
}