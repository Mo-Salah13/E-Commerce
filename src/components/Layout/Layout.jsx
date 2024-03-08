import React, { useContext, useEffect} from 'react';
// import Style from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { UserContext } from '../../Context/userContext';
import { Offline } from "react-detect-offline";
export default function Layout() {
    let { setUserToken } = useContext(UserContext);
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setUserToken(localStorage.getItem('token'))
        }
    }, []);
    return <>
        <Navbar />
        <div className="container ">
            <Outlet />
        </div>
        <div>
            <Offline>
                <div className='network-off'>
                    <i className='fas fa-wifi text-danger '></i> <i> You Lost Your Connection</i>
                </div>
            </Offline>
        </div>
        <Footer />
    </>

}
