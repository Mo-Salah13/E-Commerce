import React from 'react';
// import Style from './RoutingGuard.module.css';
import { Navigate } from 'react-router-dom';

export default function RoutingGuard({children}) {
    return <>
        {localStorage.getItem('token') ? children : <Navigate to={'/login'} />}
    </>

}
