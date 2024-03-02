import React from 'react';
// import Style from './NotExist.module.css';
import image from '../../Assets/images/error.svg'
import { Helmet } from 'react-helmet';

export default function NotExist() {
    return <>
        <Helmet>
            {/* <meta charSet="utf-8" /> */}
            <title>Not Found </title>
            {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        <div className='d-flex justify-content-center align-items-center'>
            <img src={image} alt="404 error" />

        </div>
        <p className='fw-bold fa-2x text-center'>This Page Is <span className='text-danger fst-italic'>Not Exist</span></p>
    </>

}
